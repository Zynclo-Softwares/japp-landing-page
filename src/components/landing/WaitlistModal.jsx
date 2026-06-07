import { useState, useEffect } from 'react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const REDIS_URL = 'https://musical-zebra-80134.upstash.io';
const REDIS_TOKEN = import.meta.env.VITE_REDIS_TOKEN;

async function pushToWaitlist(name, email) {
  if (!REDIS_TOKEN) throw new Error('VITE_REDIS_TOKEN is not set');
  const entry = JSON.stringify({ name, email, ts: Date.now() });
  const url = `${REDIS_URL}/lpush/waitlist/${encodeURIComponent(entry)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '(unreadable)');
    throw new Error(`Redis write failed (${res.status}): ${body}`);
  }
}

export default function WaitlistModal({ open, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus('loading');
    try {
      await pushToWaitlist(name.trim(), email.trim().toLowerCase());
      setStatus('done');
    } catch (err) {
      console.error('[WaitlistModal] error:', err.message);
      setStatus('error');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStatus('idle'); setName(''); setEmail(''); }, 400);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg text-sm bg-black/5 dark:bg-white/8 border border-black/10 dark:border-white/10 text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-[#F5C800] focus:bg-transparent transition-all duration-150";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed inset-0 z-[91] flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="relative pointer-events-auto w-full max-w-sm rounded-2xl overflow-hidden bg-background border border-border"
              style={{ boxShadow: '0 24px 64px -8px rgba(0,0,0,0.4), 0 0 0 1px oklch(0.852 0.199 91.936 / 0.15)' }}
            >
              {/* Amber top stripe */}
              <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #F5C800, #e8a800)' }} />

              <button
                onClick={handleClose}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full hover:bg-foreground/8 transition-colors text-foreground/30 hover:text-foreground/60"
              >
                <X size={14} />
              </button>

              <div className="px-7 pt-6 pb-7">
                {status === 'done' ? (
                  <div className="text-center py-4">
                    <CheckCircle2 size={40} className="mx-auto mb-3" style={{ color: '#F5C800' }} />
                    <h3 className="font-black text-xl text-foreground mb-1.5">You're on the list.</h3>
                    <p className="text-foreground/50 text-sm">We'll reach out when your spot opens up.</p>
                    <button
                      onClick={handleClose}
                      className="mt-5 px-5 py-2 rounded-lg text-sm font-bold transition-all"
                      style={{ background: '#F5C800', color: '#3d2800' }}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="flex items-center gap-2.5 mb-5">
                      <img
                        src={isDark ? "https://media.base44.com/images/public/69c758b2cd46d17f5c7b2dd0/d4d0bfd36_just-apply-icon.svg" : "https://media.base44.com/images/public/69c758b2cd46d17f5c7b2dd0/cb2b88d8e_just-apply-icon-knockout.svg"}
                        alt="Just Apply logo"
                        className="w-8 h-8 object-cover"
                      />
                      <p className="text-[10px] font-black tracking-[0.14em] uppercase" style={{ color: '#F5C800' }}>
                        Just Apply · Private Beta
                      </p>
                    </div>

                    <h2 className="font-black tracking-[-0.03em] text-foreground mb-1" style={{ fontSize: '22px', lineHeight: '1.1' }}>
                      Join the preview.
                    </h2>
                    <p className="text-foreground/45 text-xs mb-5 leading-relaxed">
                      Early access, small batches. We'll ping you when your spot's ready.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-2.5">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className={inputClass}
                      />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className={inputClass}
                      />

                      {status === 'error' && (
                        <p className="text-xs text-red-500 font-medium">Something went wrong — please try again.</p>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-black transition-all duration-150 active:scale-95 disabled:opacity-70 mt-1"
                        style={{
                          background: '#F5C800',
                          color: '#3d2800',
                          boxShadow: '0 4px 20px -4px rgba(245,200,0,0.5)',
                        }}
                      >
                        {status === 'loading' ? <Loader2 size={14} className="animate-spin" /> : null}
                        {status === 'loading' ? 'Joining...' : 'Join the Preview →'}
                      </button>
                    </form>

                    <p className="text-center text-[10px] text-foreground/30 font-medium mt-3.5">
                      No spam · Access notification only
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}