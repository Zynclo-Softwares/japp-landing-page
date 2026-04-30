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

    const dots = Array.from({ length: 420 }, () => {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      return { theta, phi, pulse: Math.random() * Math.PI * 2, speed: 0.4 + Math.random() * 1.2 };
    });

    const arcs = Array.from({ length: 18 }, () => ({
      a: Math.floor(Math.random() * dots.length),
      b: Math.floor(Math.random() * dots.length),
      progress: Math.random(),
      speed: 0.002 + Math.random() * 0.003,
    }));

    let t = 0;
    const rotSpeed = 0.002;

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Globe radius — large so only the top arc is visible (like blue reference)
      const R = W * 0.62;
      const cx = W / 2;
      // Globe center pushed well below the canvas so only top arc peeks up
      const cy = H + R * 0.18;

      // ── Full section dark background ──
      ctx.fillStyle = '#07040a';
      ctx.fillRect(0, 0, W, H);

      // Subtle radial rays from globe top
      const rayY = cy - R;
      for (let i = 0; i < 24; i++) {
        const angle = -Math.PI / 2 + (i / 23 - 0.5) * Math.PI * 1.5;
        const grad = ctx.createLinearGradient(cx, rayY, cx + Math.cos(angle) * W, rayY + Math.sin(angle) * H);
        grad.addColorStop(0, 'rgba(245,175,0,0.06)');
        grad.addColorStop(1, 'rgba(245,175,0,0)');
        ctx.beginPath();
        ctx.moveTo(cx, rayY);
        ctx.lineTo(cx + Math.cos(angle) * W * 1.5, rayY + Math.sin(angle) * H * 1.5);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Outer halo
      const halo = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.4);
      halo.addColorStop(0, 'rgba(245,170,0,0.22)');
      halo.addColorStop(0.5, 'rgba(180,100,0,0.07)');
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // Sphere body — very dark, glow only near the rim top
      const sphere = ctx.createRadialGradient(cx, cy - R * 0.85, R * 0.1, cx, cy, R);
      sphere.addColorStop(0, 'rgba(255,200,30,0.08)');
      sphere.addColorStop(0.15, 'rgba(10,5,0,0.97)');
      sphere.addColorStop(1, 'rgba(2,1,0,1)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sphere;
      ctx.fill();

      // Grid lines clipped to sphere
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      for (let lat = -75; lat <= 75; lat += 15) {
        const phi = (90 - lat) * Math.PI / 180;
        const yr = cy - Math.cos(phi) * R;
        const xr = Math.abs(Math.sin(phi)) * R;
        ctx.beginPath();
        ctx.ellipse(cx, yr, xr < 1 ? 1 : xr, xr * 0.14, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(245,175,0,0.10)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      const rot = t * rotSpeed;
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI + rot;
        const rx = Math.abs(Math.cos(angle)) * R;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx < 1 ? 1 : rx, R, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(245,175,0,0.08)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      dots.forEach(d => {
        const sx = Math.sin(d.phi) * Math.cos(d.theta + rot);
        const sy = Math.cos(d.phi);
        const sz = Math.sin(d.phi) * Math.sin(d.theta + rot);
        if (sz < -0.05) return;
        const px = cx + sx * R;
        const py = cy - sy * R;
        const pulse = 0.5 + 0.5 * Math.sin(t * d.speed * 0.05 + d.pulse);
        const size = (0.7 + pulse * 1.6) * (0.35 + sz * 0.65);
        const alpha = (0.2 + pulse * 0.65) * (0.25 + sz * 0.75);
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,200,20,${alpha})`;
        ctx.fill();
      });

      ctx.restore();

      // Bright rim — tight glowing edge like blue reference
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,195,0,0.75)';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      // Outer glow ring
      ctx.beginPath();
      ctx.arc(cx, cy, R + 6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,175,0,0.18)';
      ctx.lineWidth = 10;
      ctx.stroke();

      // Travel arcs
      arcs.forEach(arc => {
        arc.progress += arc.speed;
        if (arc.progress > 1) arc.progress = 0;
        const da = dots[arc.a], db = dots[arc.b];
        const rot2 = t * rotSpeed;
        const pAz = Math.sin(da.phi) * Math.sin(da.theta + rot2);
        const pBz = Math.sin(db.phi) * Math.sin(db.theta + rot2);
        if (pAz < 0 || pBz < 0) return;
        const pAx = cx + Math.sin(da.phi) * Math.cos(da.theta + rot2) * R;
        const pAy = cy - Math.cos(da.phi) * R;
        const pBx = cx + Math.sin(db.phi) * Math.cos(db.theta + rot2) * R;
        const pBy = cy - Math.cos(db.phi) * R;
        const midX = (pAx + pBx) / 2;
        const midY = (pAy + pBy) / 2 - R * 0.14;
        const steps = 50;
        const stop = Math.floor(arc.progress * steps);
        ctx.beginPath();
        for (let s = 0; s <= stop; s++) {
          const tt = s / steps;
          const bx = (1-tt)*(1-tt)*pAx + 2*(1-tt)*tt*midX + tt*tt*pBx;
          const by = (1-tt)*(1-tt)*pAy + 2*(1-tt)*tt*midY + tt*tt*pBy;
          s === 0 ? ctx.moveTo(bx, by) : ctx.lineTo(bx, by);
        }
        ctx.strokeStyle = `rgba(255,200,20,${0.5 - arc.progress * 0.4})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();
        if (stop > 0) {
          const tip = stop / steps;
          const bx = (1-tip)*(1-tip)*pAx + 2*(1-tip)*tip*midX + tip*tip*pBx;
          const by = (1-tip)*(1-tip)*pAy + 2*(1-tip)*tip*midY + tip*tip*pBy;
          ctx.beginPath();
          ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,225,60,0.95)';
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
      <div className="relative w-full" style={{ height: 'clamp(520px, 65vw, 740px)' }}>
        <GlobeCanvas />

        {/* Text centered vertically in the upper 55% — sitting above the globe arc */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6" style={{ paddingBottom: '20%' }}>
          <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40 mb-5">
            Apply anywhere on the internet
          </p>

          <h2
            className="font-black text-white text-center mb-3"
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