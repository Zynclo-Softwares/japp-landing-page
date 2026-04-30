import ImagePlaceholder from './ImagePlaceholder';

const IMG8_PROMPT =
  'A short cinemagraph-style frame: a Greenhouse application form on screen with fields auto-filling in real time, an amber cursor moving smoothly, a PDF resume thumbnail dragging into the upload zone. Subtle motion blur on the cursor. Dark UI, amber highlights. 16:9.';

const formFields = [
  { label: 'Full Name', value: 'Alex Rivera', filled: true },
  { label: 'Email', value: 'alex@example.com', filled: true },
  { label: 'Phone', value: '+1 (555) 000-0000', filled: true },
  { label: 'LinkedIn URL', value: 'linkedin.com/in/alex-rivera', filled: true },
  { label: 'Cover Letter', value: '', filled: false, isTextarea: true },
];

export default function FormFillSection() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-6">
              Form filling + auto-upload
            </p>
            <h2
              className="font-black tracking-[-0.025em] text-foreground mb-6"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: '1.1' }}
            >
              It already knows you.
              <br />
              Stop typing your address.
            </h2>
            <p
              className="text-foreground/60 mb-6"
              style={{ fontSize: '17px', lineHeight: '1.6' }}
            >
              The agent already has your profile. It fills every field, uploads your tailored
              resume, and submits — without you touching the keyboard.
            </p>
            <p
              className="text-sm font-semibold italic text-foreground/40 border-l-2 pl-4"
              style={{ borderColor: 'var(--primary)' }}
            >
              "It already knows your profile. Why are you still typing your phone number?"
            </p>
          </div>

          {/* Faux browser chrome + form */}
          <div
            className="rounded-2xl border border-border overflow-hidden"
            style={{ boxShadow: '0 8px 40px -8px oklch(0 0 0 / 0.15)' }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/60">
              <div className="w-3 h-3 rounded-full bg-red-400/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <div className="w-3 h-3 rounded-full bg-green-400/70" />
              <div className="ml-3 flex-1 bg-muted rounded-md px-3 py-1 text-xs text-muted-foreground font-mono truncate">
                greenhouse.io/apply/anthropic/staff-engineer
              </div>
            </div>

            <div className="p-6 space-y-3" style={{ background: 'var(--card)' }}>
              <p className="text-xs font-bold text-foreground/50 uppercase tracking-wide mb-4">
                Application Form
              </p>
              {formFields.map(({ label, value, filled, isTextarea }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold text-foreground/60 mb-1">
                    {label}
                  </label>
                  {isTextarea ? (
                    <div
                      className="w-full rounded-lg border p-3 text-sm min-h-16 relative overflow-hidden"
                      style={{
                        borderColor: 'oklch(0.852 0.199 91.936 / 0.4)',
                        background: 'oklch(0.852 0.199 91.936 / 0.04)',
                      }}
                    >
                      <div className="h-2 rounded-full w-full bg-border animate-pulse mb-2" />
                      <div className="h-2 rounded-full w-3/4 bg-border animate-pulse" />
                      <div
                        className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded"
                        style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
                      >
                        Filling…
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-full rounded-lg border px-3 py-2 text-sm font-medium text-foreground flex items-center justify-between"
                      style={{
                        borderColor: filled ? 'oklch(0.852 0.199 91.936 / 0.35)' : 'var(--border)',
                        background: filled
                          ? 'oklch(0.852 0.199 91.936 / 0.05)'
                          : 'hsl(var(--muted))',
                      }}
                    >
                      <span>{value}</span>
                      {filled && <span className="text-[10px] font-bold text-green-600">✓</span>}
                    </div>
                  )}
                </div>
              ))}

              <button
                className="w-full mt-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-default"
                style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>

        {/* IMG-8 placeholder */}
        <div className="mt-10">
          <ImagePlaceholder id="IMG-8" prompt={IMG8_PROMPT} />
        </div>
      </div>
    </section>
  );
}