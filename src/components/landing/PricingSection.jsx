const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Get started. Apply to your first 10 jobs.',
    features: [
      '10 applications / month',
      '1 resume template',
      'Basic job tracker',
      'GPT-4o mini model',
    ],
    cta: 'Download for free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    desc: 'For serious job seekers. Unlimited templates, models, and applications.',
    features: [
      'Unlimited applications',
      'Bring your own template',
      'All models (GPT-5, Claude, Gemini, Llama)',
      'Deep company research',
      'Smart job tracker + analytics',
      'Polish Agents',
      'AI-Ready Profile export',
    ],
    cta: 'Start with Pro',
    highlighted: true,
  },
  {
    name: 'Studio',
    price: '$49',
    period: 'per month',
    desc: 'For power users and career coaches managing multiple profiles.',
    features: [
      'Everything in Pro',
      'Multiple profile contexts',
      'Bulk apply queue',
      'Priority model access',
      'Dedicated support',
    ],
    cta: 'Contact us',
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-border" id="pricing">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
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
          className="text-center text-foreground/60 max-w-sm mx-auto mb-12"
          style={{ fontSize: '17px', lineHeight: '1.5' }}
        >
          Start free. Upgrade when it earns you the interview.
        </p>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 transition-all duration-200 ${
                tier.highlighted ? 'scale-105' : ''
              }`}
              style={{
                background: tier.highlighted ? 'oklch(0.852 0.199 91.936 / 0.06)' : 'var(--card)',
                borderColor: tier.highlighted ? 'oklch(0.852 0.199 91.936 / 0.4)' : 'oklch(var(--border))',
                boxShadow: tier.highlighted ? '0 8px 40px -8px oklch(0.852 0.199 91.936 / 0.25)' : undefined,
              }}
            >
              {tier.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-black tracking-wide"
                  style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  Most popular
                </div>
              )}
              <p className="text-sm font-bold text-foreground mb-1">{tier.name}</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span
                  className="text-4xl font-black tracking-[-0.03em]"
                  style={{ color: tier.highlighted ? 'var(--primary)' : 'var(--foreground)' }}
                >
                  {tier.price}
                </span>
                <span className="text-sm text-muted-foreground font-medium">/{tier.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-snug">{tier.desc}</p>

              <div className="space-y-2.5 mb-8">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm text-foreground/70 font-medium">
                    <span
                      className="mt-0.5 flex-shrink-0 text-xs font-black"
                      style={{ color: 'var(--primary)' }}
                    >
                      →
                    </span>
                    {f}
                  </div>
                ))}
              </div>

              <a
                href="#download"
                className="block text-center py-2.5 rounded-xl text-sm font-bold border transition-all duration-180 hover:scale-[1.02] active:scale-[0.98]"
                style={
                  tier.highlighted
                    ? { background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', boxShadow: '0 4px 20px -4px oklch(0.852 0.199 91.936 / 0.4)' }
                    : { background: 'transparent', color: 'var(--foreground)', borderColor: 'oklch(var(--border))' }
                }
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}