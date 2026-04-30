export default function JustApplyCard3D() {
  return (
    <div
      style={{
        perspective: '1200px',
        perspectiveOrigin: '55% 50%',
      }}
      className="flex items-center justify-center w-full py-12"
    >
      <div
        style={{
          transform: 'rotateY(-16deg) rotateX(3deg)',
          transformStyle: 'preserve-3d',
          width: '460px',
          maxWidth: '100%',
          position: 'relative',
        }}
      >
        {/* Yellow thick edge (depth illusion) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '32px',
            background: '#F5C800',
            transform: 'translateZ(-28px) translateX(20px) translateY(16px)',
            boxShadow: '0 50px 100px -10px rgba(0,0,0,0.30)',
          }}
        />

        {/* Main card face */}
        <div
          style={{
            position: 'relative',
            background: '#FAFAF5',
            borderRadius: '32px',
            padding: '40px',
            boxShadow: '0 4px 32px 0 rgba(0,0,0,0.10)',
          }}
        >
          {/* Header */}
          <p
            style={{
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.13em',
              color: '#F5C800',
              textTransform: 'uppercase',
              marginBottom: '28px',
            }}
          >
            Just Apply
          </p>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px', marginBottom: '32px' }}>
            {[
              { n: 1, title: 'See a job. Tell the agent.', sub: 'No URL needed — it sees your screen' },
              { n: 2, title: 'Agent researches the company', sub: 'Site, news, team, JD — all of it' },
              { n: 3, title: 'Tailored bundle delivered', sub: 'Resume + cover in your template' },
            ].map(({ n, title, sub }) => (
              <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#F5C800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontWeight: 900,
                    fontSize: '16px',
                    color: '#1a1a1a',
                  }}
                >
                  {n}
                </div>
                <div style={{ paddingTop: '2px' }}>
                  <p style={{ fontWeight: 800, fontSize: '19px', color: '#1a1a1a', lineHeight: 1.2, margin: 0 }}>
                    {title}
                  </p>
                  <p style={{ fontSize: '14px', color: '#999', marginTop: '4px', margin: '4px 0 0 0', fontWeight: 500 }}>
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: '#e8e8e0', marginBottom: '28px' }} />

          {/* Stats */}
          <div style={{ display: 'flex', gap: '36px' }}>
            {[
              { value: '20x', label: 'faster' },
              { value: '0', label: 'tabs open' },
              { value: '1', label: 'window' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontSize: '36px', fontWeight: 900, color: '#F5C800', margin: 0, lineHeight: 1.05 }}>
                  {value}
                </p>
                <p style={{ fontSize: '13px', color: '#aaa', margin: '2px 0 0 0', fontWeight: 600 }}>
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