import { useEffect, useRef } from 'react';

const boards = [
  'LinkedIn', 'Wellfound', 'Lever', 'Greenhouse', 'Workday',
  'That weird Notion page some founder posted on Twitter',
];

function GlobeCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    resize();
    window.addEventListener('resize', resize);

    const ctx = canvas.getContext('2d');

    // Particles on globe surface
    const particles = Array.from({ length: 600 }, () => {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      return {
        theta, phi,
        size: 0.5 + Math.random() * 1.5,
        brightness: 0.3 + Math.random() * 0.7,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
      };
    });

    let t = 0;
    const ROT = 0.0015;

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      // Large globe — fills the lower portion of the section
      const R = Math.max(W * 0.52, H * 0.85);
      // Globe center sits just below canvas center so top half of sphere is fully visible
      const cy = H * 0.72 + R * 0.3;

      // ── Dark background ──
      ctx.fillStyle = '#06040f';
      ctx.fillRect(0, 0, W, H);

      // ── Radial rays from globe apex ──
      const apexY = cy - R;
      for (let i = 0; i < 30; i++) {
        const frac = i / 29;
        const angle = (-0.7 + frac * 1.4) * Math.PI; // spread 180° upward
        const x2 = cx + Math.cos(angle) * W;
        const y2 = apexY + Math.sin(angle) * H;
        const g = ctx.createLinearGradient(cx, apexY, x2, y2);
        g.addColorStop(0, 'rgba(255,185,0,0.055)');
        g.addColorStop(1, 'rgba(255,185,0,0)');
        ctx.beginPath();
        ctx.moveTo(cx, apexY);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── Globe glow halo (behind sphere) ──
      const halo = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.5);
      halo.addColorStop(0, 'rgba(255,175,0,0.28)');
      halo.addColorStop(0.4, 'rgba(200,120,0,0.10)');
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // ── Sphere body — very dark, almost black ──
      const sphereGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      sphereGrad.addColorStop(0, '#0e0a02');
      sphereGrad.addColorStop(0.6, '#080501');
      sphereGrad.addColorStop(1, '#030200');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // ── Grid lines (lat/long) clipped to sphere ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      const rot = t * ROT;

      // Latitude rings
      for (let lat = -75; lat <= 75; lat += 15) {
        const phi = (90 - lat) * Math.PI / 180;
        const ringY = cy - Math.cos(phi) * R;
        const ringR = Math.abs(Math.sin(phi)) * R;
        if (ringR < 1) continue;
        ctx.beginPath();
        ctx.ellipse(cx, ringY, ringR, ringR * 0.12, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,185,0,0.09)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // Longitude lines
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI + rot;
        const rx = Math.abs(Math.cos(a)) * R;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx < 0.5 ? 0.5 : rx, R, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,185,0,0.07)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // ── Particles on globe surface ──
      particles.forEach(p => {
        const sx = Math.sin(p.phi) * Math.cos(p.theta + rot);
        const sy = Math.cos(p.phi);
        const sz = Math.sin(p.phi) * Math.sin(p.theta + rot);
        if (sz < 0) return; // back-face cull
        const px = cx + sx * R;
        const py = cy - sy * R;
        const twinkle = 0.5 + 0.5 * Math.sin(t * p.twinkleSpeed + p.twinkle);
        const alpha = p.brightness * twinkle * (0.2 + sz * 0.8);
        const size = p.size * (0.4 + sz * 0.6);
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,210,60,${alpha})`;
        ctx.fill();
      });

      ctx.restore();

      // ── Glowing rim ──
      // Inner bright line
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,200,0,0.85)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Soft outer glow
      for (let g = 1; g <= 4; g++) {
        ctx.beginPath();
        ctx.arc(cx, cy, R + g * 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,185,0,${0.12 - g * 0.025})`;
        ctx.lineWidth = 7;
        ctx.stroke();
      }

      t++;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function ApplyAnywhereSection() {
  return (
    <section className="overflow-hidden">
      <div className="relative w-full" style={{ height: 'clamp(520px, 62vw, 720px)' }}>
        <GlobeCanvas />

        {/* Text overlaid — centered vertically, lower half like blue reference */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6"
          style={{ paddingTop: '8%' }}
        >
          <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40 mb-5">
            Apply anywhere on the internet
          </p>

          <h2
            className="font-black text-white text-center mb-3 drop-shadow-lg"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
          >
            No job-board lock-in.
            <br />
            No API limits.
          </h2>

          <p className="text-base text-white/55 mb-8">
            If a human can apply,{' '}
            <span style={{ color: 'var(--primary)' }}>Just Apply can apply.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {boards.map((board) => (
              <span key={board} className="text-sm font-semibold text-white/35">
                {board}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}