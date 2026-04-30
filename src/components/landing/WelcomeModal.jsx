import { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
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
              {/* Amber top band */}
              <div
                className="h-2 w-full"
                style={{ background: 'linear-gradient(90deg, #F5C800, #e8a800)' }}
              />

              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/8 transition-colors text-foreground/40 hover:text-foreground/70"
              >
                <X size={16} />
              </button>

              <div className="px-10 pt-8 pb-10">
                {/* Eyebrow */}
                <p
                  className="text-[11px] font-black tracking-[0.14em] uppercase mb-5"
                  style={{ color: '#F5C800' }}
                >
                  Just Apply · Private Beta
                </p>

                {/* Headline */}
                <h2
                  className="font-black tracking-[-0.03em] text-foreground mb-5"
                  style={{ fontSize: 'clamp(26px, 4vw, 34px)', lineHeight: '1.1' }}
                >
                  The first semi-autonomous
                  <br />job-application studio.
                </h2>

                {/* Body */}
                <p
                  className="text-foreground/60 mb-8 leading-relaxed"
                  style={{ fontSize: '16px' }}
                >
                  For the first time — a semi-autonomous job-application software that gives humans
                  full flexibility to apply to any job, tailor documents in their own UI vibe, track
                  and edit on their terms. It keeps you in the loop. It keeps the company in the
                  loop. It produces exactly what you want.
                </p>

                {/* Stats row */}
                <div className="flex gap-8 mb-8 pb-8 border-b border-border">
                  {[
                    { value: '20×', label: 'faster' },
                    { value: '0', label: 'tabs open' },
                    { value: '1', label: 'window' },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <p
                        className="font-black"
                        style={{ fontSize: '28px', color: '#F5C800', lineHeight: 1.1 }}
                      >
                        {value}
                      </p>
                      <p className="text-xs text-foreground/50 font-semibold mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#download"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-base font-black transition-all duration-150 active:scale-95"
                  style={{
                    background: '#F5C800',
                    color: '#3d2800',
                    boxShadow: '0 8px 32px -6px rgba(245,200,0,0.55)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px -6px rgba(245,200,0,0.75)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 32px -6px rgba(245,200,0,0.55)'}
                >
                  <Download size={16} />
                  Download Now — Free
                </a>

                <p className="text-center text-xs text-foreground/35 font-medium mt-3">
                  macOS · Apple Silicon · No credit card
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}