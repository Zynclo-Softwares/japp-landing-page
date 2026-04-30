import { motion } from 'framer-motion';

const templateStyles = [
  { label: 'Brutalist',     bg: '#0d0d0d', text: '#fff',     accent: '#f5b400', lines: [75,55,80,60,70] },
  { label: 'Editorial',     bg: '#fdf6ec', text: '#1a1a1a',  accent: '#e05a2b', lines: [60,80,50,75,65] },
  { label: 'Swiss Grid',    bg: '#ffffff', text: '#0d0d0d',  accent: '#0d0d0d', lines: [100,45,90,45,85] },
  { label: 'Zine',          bg: '#f0e6ff', text: '#1a0030',  accent: '#7c3aed', lines: [70,50,80,40,65] },
  { label: 'Terminal',      bg: '#0a1628', text: '#4ade80',  accent: '#22c55e', lines: [80,60,75,55,70] },
  { label: 'Classic Serif', bg: '#fafaf8', text: '#1c1917',  accent: '#78716c', lines: [65,80,55,75,60] },
];

// Layout: [col, row, rotateY, rotateX, z, floatDelay]
const layout = [
  { col: 0, row: 0, ry: -18, rx: 8,  z: 20,  delay: 0    },
  { col: 1, row: 0, ry:   0, rx: 6,  z: 40,  delay: 0.5  },
  { col: 2, row: 0, ry:  18, rx: 8,  z: 20,  delay: 1.0  },
  { col: 0, row: 1, ry: -14, rx: -6, z: 30,  delay: 0.3  },
  { col: 1, row: 1, ry:   0, rx: -8, z: 50,  delay: 0.8  },
  { col: 2, row: 1, ry:  14, rx: -6, z: 30,  delay: 1.3  },
];

function TemplateCard3D({ label, bg, text, accent, lines, ry, rx, z, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3.5, delay, repeat: Infinity, ease: 'easeInOut' }}
      style={{ perspective: '600px' }}
    >
      <motion.div
        style={{
          background: bg,
          transform: `rotateY(${ry}deg) rotateX(${rx}deg) translateZ(${z}px)`,
          transformStyle: 'preserve-3d',
          boxShadow: `0 ${8 + z / 4}px ${24 + z / 2}px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.08)`,
          border: '1px solid rgba(255,255,255,0.12)',
        }}
        className="w-36 h-48 rounded-2xl p-3 flex flex-col gap-1.5 cursor-pointer"
        whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
      >
        <div className="h-2.5 rounded-full w-3/4 mb-1" style={{ background: accent }} />
        <div className="h-1.5 rounded-full w-1/2" style={{ background: text, opacity: 0.35 }} />
        <div className="h-px w-full my-1" style={{ background: text, opacity: 0.12 }} />
        {lines.map((w, i) => (
          <div key={i} className="h-1 rounded-full" style={{ background: text, opacity: 0.18, width: `${w}%` }} />
        ))}
        <div className="mt-auto text-[7px] font-bold tracking-wide uppercase" style={{ color: text, opacity: 0.45 }}>
          {label}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Templates3D() {
  return (
    <div
      className="relative w-full h-[420px] flex items-center justify-center"
      style={{ perspective: '900px' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 60% 50%, oklch(0.852 0.199 91.936 / 0.12) 0%, transparent 70%)' }}
      />
      <div
        className="grid grid-cols-3 gap-5"
        style={{ transform: 'rotateX(10deg)', transformStyle: 'preserve-3d' }}
      >
        {templateStyles.map((t, i) => (
          <TemplateCard3D key={t.label} {...t} {...layout[i]} />
        ))}
      </div>
    </div>
  );
}

export default function BYOTemplateSection() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden" id="features">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Copy */}
          <div className="lg:pt-8">
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-6">
              The thing no other tool does
            </p>

            {/* Manifesto — display weight, H1-level size */}
            <h2
              className="font-black tracking-[-0.035em] text-foreground mb-8"
              style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', lineHeight: '0.97' }}
            >
              Every other tool
              <br />
              gives you 12 templates.
              <br />
              <span style={{ color: 'var(--primary)' }}>We give you infinity.</span>
            </h2>

            <p
              className="text-foreground/60 mb-8 max-w-md"
              style={{ fontSize: '17px', lineHeight: '1.6' }}
            >
              Drop in any HTML/CSS/Tailwind layout — brutalist, editorial, monospace, your own
              design system. We fill it with polished, tailored content.{' '}
              <strong className="text-foreground font-semibold">Your vibe. Our content.</strong>{' '}
              Same artistic taste, every application.
            </p>

            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold text-foreground/70"
              style={{
                borderColor: 'oklch(0.852 0.199 91.936 / 0.3)',
                background: 'oklch(0.852 0.199 91.936 / 0.06)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary)' }} />
              HTML · CSS · Tailwind · Any layout
            </div>
          </div>

          {/* 3D floating template illustration */}
          <Templates3D />
        </div>
      </div>
    </section>
  );
}