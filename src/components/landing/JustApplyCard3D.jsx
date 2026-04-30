export default function JustApplyCard3D() {
  return (
    <div
      style={{
        perspective: '1000px',
        perspectiveOrigin: '60% 50%',
      }}
      className="flex items-center justify-center w-full"
    >
      <div
        style={{
          transform: 'rotateY(-18deg) rotateX(4deg)',
          transformStyle: 'preserve-3d',
          width: '380px',
          maxWidth: '100%',
          position: 'relative',
        }}
      >
        {/* Yellow thick right/bottom edge (depth illusion) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '28px',
            background: '#F5C800',
            transform: 'translateZ(-18px) translateX(14px) translateY(10px)',
            boxShadow: '0 40px 80px -10px rgba(0,0,0,0.35)',
          }}
        />

        {/* Main card face */}
        <div
          style={{
            position: 'relative',
            background: '#FAFAF7',
            borderRadius: '28px',
            padding: '32px',
            boxShadow: '0 2px 24px 0 rgba(0,0,0,0.10)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Header */}
          <p
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: '#F5C800',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Just Apply
          </p>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
            {[
              { n: 1, title: 'See a job. Tell the agent.', sub: 'No URL needed — it sees your screen' },
              { n: 2, title: 'Agent researches the company', sub: 'Site, news, team, JD — all of it' },
              { n: 3, title: 'Tailored bundle delivered', sub: 'Resume + cover in your template' },
            ].map(({ n, title, sub }) => (
              <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#F5C800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontWeight: 800,
                    fontSize: '14px',
                    color: '#1a1a1a',
                  }}
                >
                  {n}
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: '16px', color: '#1a1a1a', lineHeight: 1.25, margin: 0 }}>
                    {title}
                  </p>
                  <p style={{ fontSize: '13px', color: '#888', marginTop: '3px', margin: 0 }}>
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: '#e5e5e5', marginBottom: '20px' }} />

          {/* Stats */}
          <div style={{ display: 'flex', gap: '28px' }}>
            {[
              { value: '20x', label: 'faster' },
              { value: '0', label: 'tabs open' },
              { value: '1', label: 'window' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontSize: '28px', fontWeight: 900, color: '#F5C800', margin: 0, lineHeight: 1.1 }}>
                  {value}
                </p>
                <p style={{ fontSize: '12px', color: '#999', margin: 0, fontWeight: 600 }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}