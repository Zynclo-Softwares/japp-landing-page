/**
 * Reusable image placeholder — swap `src` + `alt` when the real image is ready.
 * Set `tall` for sections that need more height (Apply Anywhere, hero bands).
 */
export default function ImagePlaceholder({ id, prompt, tall = false, className = '' }) {
  return (
    <div
      className={`relative rounded-3xl border border-border bg-muted/40 overflow-hidden flex flex-col items-center justify-center gap-3 px-6 text-center ${tall ? 'min-h-80' : 'min-h-56'} ${className}`}
      aria-hidden="true"
    >
      {/* amber tint overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ background: 'var(--primary)' }}
      />
      <span
        className="relative text-[11px] font-black tracking-[0.12em] uppercase px-3 py-1 rounded-full border"
        style={{
          color: 'var(--primary)',
          borderColor: 'oklch(0.852 0.199 91.936 / 0.3)',
          background: 'oklch(0.852 0.199 91.936 / 0.08)',
        }}
      >
        {id}
      </span>
      <p className="relative text-xs text-muted-foreground font-medium max-w-md leading-relaxed">
        {prompt}
      </p>
    </div>
  );
}