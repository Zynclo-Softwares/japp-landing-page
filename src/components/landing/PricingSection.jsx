import { useState } from 'react';
import WaitlistModal from './WaitlistModal';

const creditPacks = [
  { label: 'Starter Pack', credits: '400 credits', price: '$4.99' },
  { label: 'Boost Pack', credits: '800 credits', price: '$9.99' },
  { label: 'Power Pack', credits: '1,100 credits', price: '$14.99' },
];

export default function PricingSection() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  return (
    <section className="py-24 lg:py-32 border-t border-border" id="pricing">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-4 text-center">
          Pricing
        </p>
        <h2
          className="font-black tracking-[-0.025em] text-center text-foreground mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: '1.1' }}
        >
          Simple, honest pricing.
        </h2>
        <p
          className="text-center text-foreground/60 max-w-sm mx-auto mb-16"
          style={{ fontSize: '17px', lineHeight: '1.5' }}
        >
          One subscription. Top up when you need more.
        </p>

        <div className="grid md:grid-cols-2 gap-6 items-start max-w-3xl mx-auto">

          {/* Subscription card */}
          <div
            className="relative rounded-2xl border p-8"
            style={{
              background: 'oklch(0.852 0.199 91.936 / 0.06)',
              borderColor: 'oklch(0.852 0.199 91.936 / 0.4)',
              boxShadow: '0 8px 40px -8px oklch(0.852 0.199 91.936 / 0.25)',
            }}
          >
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-black tracking-wide whitespace-nowrap"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              Monthly plan
            </div>
            <p className="text-sm font-bold text-foreground mb-1">Just Apply</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-black tracking-[-0.03em]" style={{ color: 'var(--primary)' }}>
                $19.99
              </span>
              <span className="text-sm text-muted-foreground font-medium">/month</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4"
              style={{ background: 'oklch(0.852 0.199 91.936 / 0.15)', color: 'var(--primary)' }}>
              Includes 1,400 credits / month
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-snug">
              Full access to Just Apply. Cancel anytime.
            </p>

            <div className="space-y-2.5 mb-8">
              {[
                '1,400 credits worth of applications / month',
                'Bring your own template',
                'All models (GPT-5, Claude, Gemini, Llama)',
                'Deep company research',
                'Smart job tracker + analytics',
                'Human-in-the-loop review',
              ].map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm text-foreground/70 font-medium">
                  <span className="mt-0.5 flex-shrink-0 text-xs font-black" style={{ color: 'var(--primary)' }}>→</span>
                  {f}
                </div>
              ))}
            </div>

            <button
              onClick={() => setWaitlistOpen(true)}
              className="block w-full text-center py-2.5 rounded-xl text-sm font-bold transition-all duration-180 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', boxShadow: '0 4px 20px -4px oklch(0.852 0.199 91.936 / 0.4)' }}
            >
              Join the Preview
            </button>
            <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
          </div>

          {/* Credit top-up card */}
          <div
            className="rounded-2xl border p-8"
            style={{ background: 'var(--card)', borderColor: 'hsl(var(--border))' }}
          >
            <p className="text-sm font-bold text-foreground mb-1">Credit Top-ups</p>
            <p className="text-sm text-muted-foreground mb-1">For subscribers only</p>
            <p className="text-xs text-muted-foreground/70 mb-6 leading-snug">
              Ran out of credits mid-month? Top up instantly — no plan change needed.
            </p>

            <div className="space-y-3 mb-8">
              {creditPacks.map(({ label, credits, price }) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl px-4 py-3 border"
                  style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--muted))' }}
                >
                  <div>
                    <p className="text-sm font-bold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{credits}</p>
                  </div>
                  <span
                    className="text-sm font-black"
                    style={{ color: 'var(--primary)' }}
                  >
                    {price}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Available after subscribing · Credits never expire
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}