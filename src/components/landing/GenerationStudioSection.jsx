import { Zap, Layers, Package, Cpu, Sparkles, Copy } from 'lucide-react';
import ImagePlaceholder from './ImagePlaceholder';

const IMG6_PROMPT =
  'Six small UI cards arranged in a bento grid on a graphite background: (1) three pill toggles labeled Concise / Storyteller / Metrics-First, (2) a Fast/Deep mode switch glowing amber, (3) a model picker dropdown showing GPT-5, Claude, Gemini, Llama, Ollama, (4) a checkbox stack for Resume / Cover Letter / Bundle, (5) a "Polish" button mid-press with sparkle particles, (6) a "Copy AI-ready profile" button. Glass cards, hairline borders, amber accents. Real-feeling shadcn UI aesthetic. 1:1.';

const bentoCards = [
  {
    icon: Zap,
    title: '3 Prompt Styles',
    span: 'md:col-span-2',
    content: (
      <div className="flex gap-2 flex-wrap mt-3">
        {['Concise', 'Storyteller', 'Metrics-First'].map((s) => (
          <span
            key={s}
            className="px-3 py-1 rounded-full text-xs font-bold border border-border text-foreground/70"
            style={{ background: 'hsl(var(--muted))' }}
          >
            {s}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: Layers,
    title: '2 Generation Modes',
    span: 'md:col-span-1',
    content: (
      <div className="flex items-center gap-2 mt-3">
        <div className="flex-1 p-2 rounded-lg text-center text-xs font-semibold text-foreground/60 border border-border">
          Fast Draft
        </div>
        <div
          className="flex-1 p-2 rounded-lg text-center text-xs font-semibold"
          style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          Deep Tailor
        </div>
      </div>
    ),
  },
  {
    icon: Package,
    title: 'Bundle Freedom',
    span: 'md:col-span-1',
    content: (
      <div className="space-y-2 mt-3">
        {['Resume only', 'Cover letter only', 'Full bundle'].map((opt) => (
          <div key={opt} className="flex items-center gap-2 text-xs text-foreground/70 font-medium">
            <span
              className="w-3.5 h-3.5 rounded border-2 flex-shrink-0"
              style={{ borderColor: 'var(--primary)' }}
            />
            {opt}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Cpu,
    title: 'Model Picker',
    span: 'md:col-span-2',
    content: (
      <div className="space-y-1.5 mt-3">
        {['GPT-5', 'Claude Opus 4.7', 'Gemini 2.5', 'Llama 3.3', 'Ollama (local)'].map((m, i) => (
          <div
            key={m}
            className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium border border-border"
            style={{
              background: i === 1 ? 'oklch(0.852 0.199 91.936 / 0.08)' : 'hsl(var(--muted))',
              borderColor: i === 1 ? 'oklch(0.852 0.199 91.936 / 0.3)' : undefined,
            }}
          >
            <span className="text-foreground/80">{m}</span>
            {i === 1 && (
              <span className="text-[10px] font-bold" style={{ color: 'var(--primary)' }}>
                selected
              </span>
            )}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Sparkles,
    title: 'Polish Agents',
    span: 'md:col-span-1',
    liveIndicator: true,
    content: (
      <div className="space-y-2 mt-3">
        {['Rewrite tone', 'Tighten bullets', 'Quantify impact'].map((a) => (
          <div key={a} className="text-xs text-foreground/60 font-medium flex items-center gap-2">
            <Sparkles size={10} style={{ color: 'var(--primary)' }} />
            {a}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Copy,
    title: 'AI-Ready Profile',
    span: 'md:col-span-1',
    content: (
      <div className="mt-3">
        <button
          className="w-full py-2 rounded-lg text-xs font-bold border border-border flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
          style={{ color: 'var(--primary-foreground)', background: 'var(--primary)' }}
        >
          <Copy size={10} />
          Copy clean profile blob
        </button>
        <p className="text-[10px] text-muted-foreground mt-2 text-center">Model-agnostic · No AI bloat</p>
      </div>
    ),
  },
];

export default function GenerationStudioSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-4 text-center">
          The generation studio
        </p>
        <h2
          className="font-black tracking-[-0.025em] text-center text-foreground mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: '1.1' }}
        >
          Three prompt styles. Two generation modes.
          <br />
          Bundle however you want.
        </h2>
        <p
          className="text-center text-foreground/60 max-w-lg mx-auto mb-12"
          style={{ fontSize: '18px', lineHeight: '1.5' }}
        >
          Pick the model that fits the moment.
        </p>

        {/* IMG-6 placeholder as backdrop label */}
        <div className="relative rounded-3xl overflow-hidden border border-border">
          {/* Backdrop placeholder stripe */}
          <div className="absolute inset-0 bg-muted/40 rounded-3xl pointer-events-none" />
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
            <span
              className="text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full border opacity-50"
              style={{
                color: 'var(--primary)',
                borderColor: 'oklch(0.852 0.199 91.936 / 0.3)',
                background: 'oklch(0.852 0.199 91.936 / 0.06)',
              }}
            >
              IMG-6 backdrop · Generation Studio bento
            </span>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-3 p-4 pt-10">
            {bentoCards.map(({ icon: Icon, title, content, span, liveIndicator }) => (
              <div
                key={title}
                className={`${span} rounded-2xl border border-border p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[oklch(0.852_0.199_91.936_/_0.3)] hover:shadow-[0_4px_20px_-4px_oklch(0.852_0.199_91.936_/_0.15)]`}
                style={{ background: 'var(--card)', boxShadow: 'inset 0 1px 0 0 oklch(1 0 0 / 0.04)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={14} style={{ color: 'var(--primary)' }} />
                    <p className="text-sm font-bold text-foreground">{title}</p>
                  </div>
                  {liveIndicator && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: 'var(--primary)' }}
                      />
                      <span className="text-[10px] text-muted-foreground font-medium">streaming</span>
                    </div>
                  )}
                </div>
                {content}
              </div>
            ))}
          </div>
        </div>

        {/* Separate IMG-6 full prompt placeholder below the bento */}
        <div className="mt-4">
          <ImagePlaceholder id="IMG-6" prompt={IMG6_PROMPT} />
        </div>
      </div>
    </section>
  );
}