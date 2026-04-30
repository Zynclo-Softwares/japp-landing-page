import { useEffect, useRef, useState } from 'react';

const boards = [
  'LinkedIn', 'Wellfound', 'Lever', 'Greenhouse', 'Workday',

];

function GlobeCanvas({ isDark }) {
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
      // R = exactly half the canvas width so the circle touches both side edges
      const R = W * 0.5;
      // Center at the bottom edge so a perfect half-dome is shown
      const cy = H + R * 0.02;

      // No background — transparent canvas, inherits page bg

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
      const halo = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.3);
      halo.addColorStop(0, 'rgba(255,175,0,0.10)');
      halo.addColorStop(0.5, 'rgba(200,120,0,0.05)');
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // ── Sphere body — matches page background ──
      const bgColor = isDark ? '#17130a' : '#f5f3ef';
      const bgEdge  = isDark ? '#0d0a05' : '#ece9e3';
      const sphereGrad = ctx.createRadialGradient(cx * 0.85, cy * 0.85, 0, cx, cy, R);
      sphereGrad.addColorStop(0,   bgColor);
      sphereGrad.addColorStop(0.7, bgColor);
      sphereGrad.addColorStop(1,   bgEdge);
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
        ctx.strokeStyle = 'rgba(255,185,0,0.28)';
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Longitude lines
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI + rot;
        const rx = Math.abs(Math.cos(a)) * R;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx < 0.5 ? 0.5 : rx, R, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,185,0,0.22)';
        ctx.lineWidth = 0.9;
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

      // ── Glowing rim — tight atmospheric band ──
      const rimWidth = R * 0.06;
      const rimGrad = ctx.createRadialGradient(cx, cy, R - rimWidth, cx, cy, R + rimWidth * 0.4);
      rimGrad.addColorStop(0,    'rgba(255,185,0,0)');
      rimGrad.addColorStop(0.55, 'rgba(255,195,0,0.20)');
      rimGrad.addColorStop(0.82, 'rgba(255,210,0,0.60)');
      rimGrad.addColorStop(0.94, 'rgba(255,225,60,0.88)');
      rimGrad.addColorStop(1,    'rgba(255,230,80,0)');

      ctx.beginPath();
      ctx.arc(cx, cy, R + rimWidth * 0.4, 0, Math.PI * 2);
      ctx.arc(cx, cy, R - rimWidth, 0, Math.PI * 2, true);
      ctx.fillStyle = rimGrad;
      ctx.fill();

      // Crisp bright line at the very edge
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,225,60,0.90)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      t++;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function ApplyAnywhereSection() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const headingColor = isDark ? 'text-white' : 'text-foreground';
  const subColor = isDark ? 'text-white/40' : 'text-muted-foreground';
  const bodyColor = isDark ? 'text-white/55' : 'text-foreground/60';
  const tagColor = isDark ? 'text-white/35' : 'text-foreground/40';

  return (
    <section className="overflow-hidden">
      <div className="relative w-full" style={{ height: 'clamp(520px, 62vw, 720px)' }}>
        <GlobeCanvas isDark={isDark} />

        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6"
          style={{ paddingTop: '8%' }}
        >
          <p className={`text-[11px] font-bold tracking-[0.12em] uppercase mb-5 ${subColor}`}>
            Apply anywhere on the internet
          </p>

          <h2
            className={`font-black text-center mb-3 drop-shadow-lg ${headingColor}`}
            style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
          >
            No job-board lock-in.
            <br />
            No API limits.
          </h2>

          <p className={`text-base mb-8 ${bodyColor}`}>
            If a human can apply,{' '}
            <span style={{ color: 'var(--primary)' }}>Just Apply can apply.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {boards.map((board) => (
              <span key={board} className={`text-sm font-semibold ${tagColor}`}>
                {board}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}