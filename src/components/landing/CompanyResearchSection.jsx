import { Globe, Newspaper, Users, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const researchItems = [
  { icon: Globe,     label: 'Company website',    sub: 'Values, mission, product direction', delay: 0    },
  { icon: Newspaper, label: 'Recent news',         sub: 'Funding, launches, pivots',          delay: 0.6  },
  { icon: Users,     label: 'Team page',           sub: 'Culture signals, hiring patterns',   delay: 1.2  },
  { icon: FileText,  label: 'Job post deep-read',  sub: "What they're actually asking for",   delay: 1.8  },
];

function ResearchCard3D({ icon: Icon, label, sub, delay, index }) {
  const rotations = [-6, 4, -3, 5];
  const floatAmounts = [-8, -12, -6, -10];
  const ry = rotations[index];

  return (
    <motion.div
      initial={{ opacity: 0, x: -40, rotateY: ry - 20 }}
      animate={{ opacity: 1, x: 0, rotateY: ry }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      style={{ perspective: '600px' }}
    >
      <motion.div
        animate={{ y: [0, floatAmounts[index], 0] }}
        transition={{ duration: 3.5 + index * 0.4, delay: delay + 0.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          transform: `rotateY(${ry}deg)`,
          transformStyle: 'preserve-3d',
          boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        }}
        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-border bg-card"
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'oklch(0.852 0.199 91.936 / 0.15)' }}
        >
          <Icon size={14} style={{ color: 'var(--primary)' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-snug">{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{sub}</p>
        </div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.5 }}
        >
          <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ResearchIllustration() {
  return (
    <div className="relative w-full py-6" style={{ perspective: '900px' }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{ background: 'radial-gradient(ellipse at 40% 50%, oklch(0.852 0.199 91.936 / 0.10) 0%, transparent 70%)' }}
      />

      {/* Header badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-5"
      >
        <div className="px-2.5 py-1 rounded-md text-xs font-bold" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          Company Dossier
        </div>
        <span className="text-xs text-muted-foreground">· Anthropic</span>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="ml-auto text-[10px] font-semibold text-green-600"
        >
          ● Researching…
        </motion.span>
      </motion.div>

      {/* Research cards grid */}
      <div className="grid grid-cols-2 gap-3">
        {researchItems.map((item, i) => (
          <ResearchCard3D key={item.label} {...item} index={i} />
        ))}
      </div>

      {/* Footer signal */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        className="text-xs text-muted-foreground font-medium mt-5 pt-4 border-t border-border"
      >
        Ready · Agent found 3 alignment signals between your profile and their mission
      </motion.p>
    </div>
  );
}

export default function CompanyResearchSection() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 3D animated research illustration */}
          <div className="order-2 lg:order-1">
            <ResearchIllustration />
          </div>

          {/* Copy right */}
          <div className="order-1 lg:order-2">
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-6">
              Deep company research
            </p>
            <h2
              className="font-black tracking-[-0.025em] text-foreground mb-6"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: '1.1' }}
            >
              Your resume answers what they're actually asking.
            </h2>
            <p
              className="text-foreground/60 mb-8 max-w-md"
              style={{ fontSize: '17px', lineHeight: '1.6' }}
            >
              Before a single bullet is written, an agent reads the company's site, recent news,
              the team page, and the job post. The output isn't generic AI content — it's a direct
              response to what that specific team is hiring for.
            </p>
            <p
              className="text-sm font-semibold italic text-foreground/50 border-l-2 pl-4"
              style={{ borderColor: 'var(--primary)' }}
            >
              "Before a single bullet is written, an agent reads the company's site, recent news,
              the team page, and the job post."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}