import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WaitlistModal from './WaitlistModal';

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('japp-welcome-seen')) return;
    const timer = setTimeout(() => setOpen(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    localStorage.setItem('japp-welcome-seen', '1');
    setOpen(false);
  };

  const handleJoin = () => {
    handleClose();
    setTimeout(() => setWaitlistOpen(true), 350);
  };

  return (
    <>
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
              onClick={handleClose}
            />

            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28, delay: 0.05 }}
              className="fixed inset-0 z-[91] flex items-center justify-center px-4 pointer-events-none"
            >
              <div
                className="relative pointer-events-auto max-w-lg w-full rounded-3xl overflow-hidden"
                style={{
                  background: 'oklch(0.98 0.018 90)',
                  boxShadow: '0 32px 80px -8px rgba(0,0,0,0.45), 0 0 0 1px oklch(0.852 0.199 91.936 / 0.2)',
                }}
              >
                <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #F5C800, #e8a800)' }} />

                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/8 transition-colors text-foreground/40 hover:text-foreground/70"
                >
                  <X size={16} />
                </button>

                <div className="px-10 pt-8 pb-10">
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
                    className="font-black tracking-[-0.03em] text-foreground mb-5"
                    style={{ fontSize: 'clamp(26px, 4vw, 34px)', lineHeight: '1.1' }}
                  >
                    The first semi-autonomous
                    <br />job-application studio.
                  </h2>

                  <p className="text-foreground/60 mb-8 leading-relaxed" style={{ fontSize: '16px' }}>
                    For the first time — a semi-autonomous job-application software that gives humans
                    full flexibility to apply to any job, tailor documents in their own UI vibe, track
                    and edit on their terms. It keeps you in the loop.
                  </p>

                  <div className="flex gap-8 mb-8 pb-8 border-b border-border">
                    {[
                      { value: '20×', label: 'faster' },
                      { value: '0', label: 'tabs open' },
                      { value: '1', label: 'window' },
                    ].map(({ value, label }) => (
                      <div key={label}>
                        <p className="font-black" style={{ fontSize: '28px', color: '#F5C800', lineHeight: 1.1 }}>
                          {value}
                        </p>
                        <p className="text-xs text-foreground/50 font-semibold mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleJoin}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-base font-black transition-all duration-150 active:scale-95"
                    style={{
                      background: '#F5C800',
                      color: '#3d2800',
                      boxShadow: '0 8px 32px -6px rgba(245,200,0,0.55)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px -6px rgba(245,200,0,0.75)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 32px -6px rgba(245,200,0,0.55)'}
                  >
                    Join the Preview →
                  </button>

                  <p className="text-center text-xs text-foreground/35 font-medium mt-3">
                    Invite-only beta · No credit card
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}