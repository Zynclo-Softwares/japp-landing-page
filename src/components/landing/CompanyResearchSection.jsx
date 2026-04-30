import { Globe, Newspaper, Users, FileText } from 'lucide-react';
import ImagePlaceholder from './ImagePlaceholder';

const IMG4_PROMPT =
  'A dossier folder slightly open on a dark desk, papers fanned out: a company logo sketch, a highlighted news clipping, a "what they value" sticky note, an org chart fragment, and a paperclip holding a job description. An amber desk lamp lights it from the upper-left. Top-down 45° angle. Hyperreal, slight grain. Evokes investigative journalism, not corporate. 3:2.';

const researchItems = [
  { icon: Globe, label: 'Company website', sub: 'Values, mission, product direction' },
  { icon: Newspaper, label: 'Recent news', sub: 'Funding, launches, pivots' },
  { icon: Users, label: 'Team page', sub: 'Culture signals, hiring patterns' },
  { icon: FileText, label: 'Job post deep-read', sub: "What they're actually asking for" },
];

export default function CompanyResearchSection() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual left — dossier mock + IMG-4 placeholder */}
          <div className="order-2 lg:order-1 space-y-4">
            <div
              className="rounded-3xl border border-border p-6 lg:p-8"
              style={{ background: 'var(--card)', boxShadow: 'inset 0 1px 0 0 oklch(1 0 0 / 0.04)' }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="px-2.5 py-1 rounded-md text-xs font-bold"
                  style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  Company Dossier
                </div>
                <span className="text-xs text-muted-foreground">· Anthropic</span>
              </div>
              <div className="space-y-3">
                {researchItems.map(({ icon: Icon, label, sub }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 p-3 rounded-xl border border-border transition-colors"
                    style={{ background: 'hsl(var(--muted))' }}
                  >
                    <div
                      className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'oklch(0.852 0.199 91.936 / 0.15)' }}
                    >
                      <Icon size={13} style={{ color: 'var(--primary)' }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-snug">{label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                    </div>
                    <div className="ml-auto flex-shrink-0">
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-950/40 px-1.5 py-0.5 rounded-full">
                        Done
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-border">
                <p className="text-xs text-muted-foreground font-medium">
                  Ready · Agent found 3 alignment signals between your profile and their mission
                </p>
              </div>
            </div>

            <ImagePlaceholder id="IMG-4" prompt={IMG4_PROMPT} />
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