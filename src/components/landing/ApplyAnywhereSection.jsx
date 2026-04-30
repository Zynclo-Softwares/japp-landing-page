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

    // Generate surface dots uniformly on sphere
    const dots = Array.from({ length: 380 }, () => {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      return { theta, phi, pulse: Math.random() * Math.PI * 2, speed: 0.4 + Math.random() * 1.2 };
    });

    // Arc travel lines
    const arcs = Array.from({ length: 22 }, () => ({
      a: Math.floor(Math.random() * dots.length),
      b: Math.floor(Math.random() * dots.length),
      progress: Math.random(),
      speed: 0.0025 + Math.random() * 0.003,
    }));

    let t = 0;
    const rotSpeed = 0.0025;

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Globe center is below the canvas bottom — only top arc visible
      const R = W * 0.58;
      const cx = W / 2;
      const cy = H + R * 0.08; // globe center sits just below bottom edge

      // ── Background ──────────────────────────────────────────────
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      // Radial rays from globe center top
      const rayY = cy - R;
      for (let i = 0; i < 20; i++) {
        const angle = -Math.PI / 2 + (i / 19 - 0.5) * Math.PI * 1.3;
        const grad = ctx.createLinearGradient(cx, rayY, cx + Math.cos(angle) * W * 1.4, rayY + Math.sin(angle) * H * 1.4);
        grad.addColorStop(0, 'rgba(245,175,0,0.09)');
        grad.addColorStop(1, 'rgba(245,175,0,0)');
        ctx.beginPath();
        ctx.moveTo(cx, rayY);
        ctx.lineTo(cx + Math.cos(angle) * W * 1.4, rayY + Math.sin(angle) * H * 1.4);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // ── Globe halo glow ──────────────────────────────────────────
      const halo = ctx.createRadialGradient(cx, cy, R * 0.55, cx, cy, R * 1.35);
      halo.addColorStop(0, 'rgba(245,170,0,0.28)');
      halo.addColorStop(0.45, 'rgba(200,120,0,0.10)');
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // ── Globe sphere ─────────────────────────────────────────────
      const sphere = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.35, R * 0.02, cx, cy, R);
      sphere.addColorStop(0, 'rgba(255,195,20,0.22)');
      sphere.addColorStop(0.35, 'rgba(30,16,0,0.88)');
      sphere.addColorStop(1, 'rgba(4,2,0,0.97)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sphere;
      ctx.fill();

      // ── Grid (clipped to sphere) ──────────────────────────────────
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Latitude ellipses
      for (let lat = -70; lat <= 70; lat += 15) {
        const phi = (90 - lat) * Math.PI / 180;
        const yr = cy - Math.cos(phi) * R;
        const xr = Math.abs(Math.sin(phi)) * R;
        ctx.beginPath();
        ctx.ellipse(cx, yr, xr, xr * 0.15, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(245,175,0,0.11)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // Longitude ellipses
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI + t * rotSpeed;
        const rx = Math.abs(Math.cos(angle)) * R;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx < 1 ? 1 : rx, R, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(245,175,0,0.09)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // Surface dots
      const rot = t * rotSpeed;
      dots.forEach(d => {
        const sx = Math.sin(d.phi) * Math.cos(d.theta + rot);
        const sy = Math.cos(d.phi);
        const sz = Math.sin(d.phi) * Math.sin(d.theta + rot);
        if (sz < -0.1) return;
        const px = cx + sx * R;
        const py = cy - sy * R;
        const pulse = 0.5 + 0.5 * Math.sin(t * d.speed * 0.05 + d.pulse);
        const size = (0.8 + pulse * 1.8) * (0.4 + sz * 0.6);
        const alpha = (0.25 + pulse * 0.7) * (0.3 + sz * 0.7);
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,195,15,${alpha})`;
        ctx.fill();
      });

      ctx.restore();

      // ── Rim glow ──────────────────────────────────────────────────
      const rim = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.03);
      rim.addColorStop(0, 'rgba(245,175,0,0)');
      rim.addColorStop(0.5, 'rgba(245,175,0,0.45)');
      rim.addColorStop(1, 'rgba(245,175,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = rim;
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // ── Animated arc travel lines ─────────────────────────────────
      arcs.forEach(arc => {
        arc.progress += arc.speed;
        if (arc.progress > 1) arc.progress = 0;
        const da = dots[arc.a], db = dots[arc.b];
        const pAz = Math.sin(da.phi) * Math.sin(da.theta + rot);
        const pBz = Math.sin(db.phi) * Math.sin(db.theta + rot);
        if (pAz < 0 || pBz < 0) return;
        const pAx = cx + Math.sin(da.phi) * Math.cos(da.theta + rot) * R;
        const pAy = cy - Math.cos(da.phi) * R;
        const pBx = cx + Math.sin(db.phi) * Math.cos(db.theta + rot) * R;
        const pBy = cy - Math.cos(db.phi) * R;
        const midX = (pAx + pBx) / 2;
        const midY = (pAy + pBy) / 2 - R * 0.15;
        const steps = 50;
        const stop = Math.floor(arc.progress * steps);
        ctx.beginPath();
        for (let s = 0; s <= stop; s++) {
          const tt = s / steps;
          const bx = (1 - tt) * (1 - tt) * pAx + 2 * (1 - tt) * tt * midX + tt * tt * pBx;
          const by = (1 - tt) * (1 - tt) * pAy + 2 * (1 - tt) * tt * midY + tt * tt * pBy;
          s === 0 ? ctx.moveTo(bx, by) : ctx.lineTo(bx, by);
        }
        ctx.strokeStyle = `rgba(255,200,20,${0.55 - arc.progress * 0.45})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
        if (stop > 0) {
          const tip = stop / steps;
          const bx = (1 - tip) * (1 - tip) * pAx + 2 * (1 - tip) * tip * midX + tip * tip * pBx;
          const by = (1 - tip) * (1 - tip) * pAy + 2 * (1 - tip) * tip * midY + tip * tip * pBy;
          ctx.beginPath();
          ctx.arc(bx, by, 2.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,220,60,0.95)';
          ctx.fill();
        }
      });

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
      {/* Text + boards — normal background */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center pt-24 lg:pt-32 pb-10">
        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-4">
          Apply anywhere on the internet
        </p>
        <h2
          className="font-black tracking-[-0.03em] text-foreground mb-6"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: '1.05' }}
        >
          No job-board lock-in.
          <br />
          No API limits.
        </h2>
        <p className="text-foreground/60 max-w-xl mx-auto mb-10" style={{ fontSize: '18px', lineHeight: '1.5' }}>
          If a human can apply, Just Apply can apply.
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-0">
          {boards.map((board) => (
            <span key={board} className="text-sm font-semibold text-foreground/50 hover:text-foreground/80 transition-colors cursor-default">
              {board}
            </span>
          ))}
        </div>
      </div>

      {/* Dark globe block — full width, text overlaid */}
      <div className="relative w-full" style={{ height: 'clamp(360px, 55vw, 620px)', background: '#000' }}>
        <GlobeCanvas />

        {/* Overlay text centered on top half */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-16 z-10 pointer-events-none">
          <h3
            className="font-black text-white text-center drop-shadow-lg"
            style={{ fontSize: 'clamp(28px, 4vw, 56px)', lineHeight: '1.1', letterSpacing: '-0.03em', textShadow: '0 0 60px rgba(245,175,0,0.4)' }}
          >
            If a human can apply,
            <br />
            <span style={{ color: 'oklch(0.852 0.199 91.936)' }}>Just Apply can apply.</span>
          </h3>
        </div>

        {/* Top fade from page background into black */}
        <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-20"
          style={{ background: 'linear-gradient(to bottom, var(--background) 0%, transparent 100%)' }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
          style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}
        />
      </div>
    </section>
  );
}