import { useState } from 'react';
import { X, Mail, User, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const REDIS_URL = 'https://musical-zebra-80134.upstash.io';
const REDIS_TOKEN = import.meta.env.VITE_REDIS_TOKEN;

async function pushToWaitlist(name, email) {
  console.log('[WaitlistModal] Token present:', !!REDIS_TOKEN);
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
  const [status, setStatus] = useState('idle'); // idle | loading | done | error

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

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fixed inset-0 z-[91] flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="relative pointer-events-auto max-w-md w-full rounded-3xl overflow-hidden"
              style={{
                background: 'oklch(0.98 0.018 90)',
                boxShadow: '0 32px 80px -8px rgba(0,0,0,0.45), 0 0 0 1px oklch(0.852 0.199 91.936 / 0.2)',
              }}
            >
              {/* Amber top band */}
              <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #F5C800, #e8a800)' }} />

              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/8 transition-colors text-foreground/40 hover:text-foreground/70"
              >
                <X size={16} />
              </button>

              <div className="px-10 pt-8 pb-10">
                {status === 'done' ? (
                  <div className="text-center py-6">
                    <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: '#F5C800' }} />
                    <h3 className="font-black text-2xl text-foreground mb-2">You're on the list.</h3>
                    <p className="text-foreground/55 text-sm">We'll reach out when your spot opens up.</p>
                    <button
                      onClick={handleClose}
                      className="mt-6 px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
                      style={{ background: '#F5C800', color: '#3d2800' }}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-5">
                      <img
                        src="https://media.base44.com/images/public/69c758b2cd46d17f5c7b2dd0/bfb560be2_logo.png"
                        alt="Just Apply logo"
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <p className="text-[11px] font-black tracking-[0.14em] uppercase" style={{ color: '#F5C800' }}>
                        Just Apply · Private Beta
                      </p>
                    </div>

                    <h2
                      className="font-black tracking-[-0.03em] text-foreground mb-2"
                      style={{ fontSize: 'clamp(22px, 4vw, 28px)', lineHeight: '1.1' }}
                    >
                      Join the preview.
                    </h2>
                    <p className="text-foreground/55 text-sm mb-7 leading-relaxed">
                      We're rolling out access in small batches. Drop your info and we'll let you know when your spot is ready.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm border border-foreground/20 bg-transparent focus:outline-none focus:ring-2 text-foreground placeholder:text-foreground/40"
                        style={{ '--tw-ring-color': '#F5C800' }}
                      />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm border border-foreground/20 bg-transparent focus:outline-none focus:ring-2 text-foreground placeholder:text-foreground/40"
                        style={{ '--tw-ring-color': '#F5C800' }}
                      />

                      {status === 'error' && (
                        <p className="text-xs text-red-500 font-medium">Something went wrong — please try again.</p>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-base font-black transition-all duration-150 active:scale-95 disabled:opacity-70"
                        style={{
                          background: '#F5C800',
                          color: '#3d2800',
                          boxShadow: '0 8px 32px -6px rgba(245,200,0,0.55)',
                        }}
                      >
                        {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : null}
                        {status === 'loading' ? 'Joining...' : 'Join the Preview →'}
                      </button>
                    </form>

                    <p className="text-center text-xs text-foreground/35 font-medium mt-3">
                      No spam · We'll only email you about your access
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