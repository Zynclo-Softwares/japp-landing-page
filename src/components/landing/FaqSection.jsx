import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What job boards does Just Apply support?',
    a: 'Any website where a human can apply — LinkedIn, Wellfound, Lever, Greenhouse, Workday, Ashby, and even that Notion page some founder posted on Twitter. If it\'s in a browser, we can apply to it.',
  },
  {
    q: 'What do you mean by "bring your own template"?',
    a: 'You upload image templates for your resume and cover letter — your own designs, ones you bought, or ones you found online. Just Apply recreates both with tailored, polished content every time. Your visual identity, our words.',
  },
  {
    q: 'How does the company research actually work?',
    a: 'An agent crew reads the company\'s website, recent news, team page, and job post before writing a single bullet. The output reflects what that specific team values, not a generic AI completion.',
  },
  {
    q: 'Which AI models can I use?',
    a: 'We run the best available model by default. Subscribers can switch between GPT-5, Claude Opus 4.7, Gemini 2.5, and Llama 3.3 per generation — free users get the default model only.',
  },
  {
    q: 'Is this available on Windows or Linux?',
    a: 'Just Apply will be available on macOS, Windows, and Linux. Join the beta and we\'ll notify you when your platform ships.',
  },
  {
    q: 'Does the agent ever submit without my review?',
    a: 'Only if you choose Autonomous mode. In the default Review mode, the agent pauses before submitting — you see the tailored resume and cover letter, make any edits, then approve. You\'re always in the loop.',
  },
  {
    q: 'Is my data private?',
    a: 'Your profile and application data stay local by default. When you use cloud models (GPT-5, Claude, etc.), your prompts go through those providers\' APIs.',
  },
  {
    q: 'What does "private beta" mean for pricing?',
    a: 'Beta users get early access at lower pricing and help shape the product. Beta pricing is locked in when you subscribe — it won\'t increase when we launch publicly.',
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 lg:py-32 border-t border-border bg-muted/20">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-4 text-center">
          FAQ
        </p>
        <h2
          className="font-black tracking-[-0.025em] text-center text-foreground mb-12"
          style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: '1.1' }}
        >
          Common questions.
        </h2>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-border overflow-hidden"
              style={{ background: 'var(--card)' }}
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className="flex-shrink-0 text-muted-foreground transition-transform duration-200"
                  style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4">
                  <div className="h-px bg-border mb-4" />
                  <p className="text-sm text-foreground/70 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}