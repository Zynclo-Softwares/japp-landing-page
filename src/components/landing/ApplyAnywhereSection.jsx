import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const boards = [
  'LinkedIn',
  'Wellfound',
  'Lever',
  'Greenhouse',
  'Workday',
  'That weird Notion page some founder posted on Twitter',
];

function GlobeIllustration() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = 800;
    const H = canvas.height = 420;
    const cx = W / 2, cy = H * 0.52;
    const R = 160;

    // Generate random surface dots
    const dots = Array.from({ length: 280 }, () => {
      const u = Math.random(), v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      return { theta, phi, pulse: Math.random() * Math.PI * 2, speed: 0.5 + Math.random() * 1.5 };
    });

    // Arc connections between random pairs
    const arcs = Array.from({ length: 18 }, () => ({
      a: Math.floor(Math.random() * dots.length),
      b: Math.floor(Math.random() * dots.length),
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
    }));

    let t = 0;
    const rotSpeed = 0.003;

    function project(theta, phi, rot) {
      const x = Math.sin(phi) * Math.cos(theta + rot);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta + rot);
      return { x: cx + x * R, y: cy - y * R, z };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Dark background
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.7);
      bgGrad.addColorStop(0, '#1a1200');
      bgGrad.addColorStop(0.5, '#0d0900');
      bgGrad.addColorStop(1, '#000000');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Radial light rays from top of globe
      const rayOriginY = cy - R * 0.6;
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        const rayGrad = ctx.createLinearGradient(cx, rayOriginY, cx + Math.cos(angle) * W, rayOriginY + Math.sin(angle) * H);
        rayGrad.addColorStop(0, 'rgba(245,180,0,0.06)');
        rayGrad.addColorStop(1, 'rgba(245,180,0,0)');
        ctx.beginPath();
        ctx.moveTo(cx, rayOriginY);
        ctx.lineTo(cx + Math.cos(angle) * W * 1.5, rayOriginY + Math.sin(angle) * H * 1.5);
        ctx.strokeStyle = rayGrad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Globe glow halo
      const halo = ctx.createRadialGradient(cx, cy - R * 0.1, R * 0.7, cx, cy, R * 1.6);
      halo.addColorStop(0, 'rgba(245,180,0,0.22)');
      halo.addColorStop(0.5, 'rgba(245,150,0,0.08)');
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // Globe sphere fill
      const sphereGrad = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.3, R * 0.05, cx, cy, R);
      sphereGrad.addColorStop(0, 'rgba(245,180,0,0.18)');
      sphereGrad.addColorStop(0.5, 'rgba(20,12,0,0.85)');
      sphereGrad.addColorStop(1, 'rgba(5,3,0,0.95)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Clip to sphere for grid + dots
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Latitude lines
      for (let lat = -80; lat <= 80; lat += 20) {
        const phi = (90 - lat) * Math.PI / 180;
        const yr = cy - Math.cos(phi) * R;
        const xr = Math.abs(Math.sin(phi)) * R;
        ctx.beginPath();
        ctx.ellipse(cx, yr, xr, xr * 0.18, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(245,180,0,0.12)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Longitude lines
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI + t * rotSpeed;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(Math.cos(angle)) * R, R, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(245,180,0,0.10)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Surface dots
      dots.forEach(d => {
        const p = project(d.theta, d.phi, t * rotSpeed);
        if (p.z < 0) return; // back-face cull
        const pulse = 0.5 + 0.5 * Math.sin(t * d.speed + d.pulse);
        const size = 1.2 + pulse * 1.4;
        const alpha = 0.3 + pulse * 0.65;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,190,10,${alpha})`;
        ctx.fill();
      });

      ctx.restore(); // unclip

      // Globe edge rim
      const rimGrad = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.02);
      rimGrad.addColorStop(0, 'rgba(245,180,0,0)');
      rimGrad.addColorStop(0.6, 'rgba(245,180,0,0.35)');
      rimGrad.addColorStop(1, 'rgba(245,180,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Arc connections (animated travel lines)
      arcs.forEach(arc => {
        arc.progress += arc.speed;
        if (arc.progress > 1) arc.progress = 0;
        const pA = project(dots[arc.a].theta, dots[arc.a].phi, t * rotSpeed);
        const pB = project(dots[arc.b].theta, dots[arc.b].phi, t * rotSpeed);
        if (pA.z < 0 || pB.z < 0) return;
        const midX = (pA.x + pB.x) / 2;
        const midY = (pA.y + pB.y) / 2 - 30;
        // Draw partial arc up to progress
        const steps = 40;
        const stop = Math.floor(arc.progress * steps);
        ctx.beginPath();
        for (let s = 0; s <= stop; s++) {
          const tt = s / steps;
          const bx = (1-tt)*(1-tt)*pA.x + 2*(1-tt)*tt*midX + tt*tt*pB.x;
          const by = (1-tt)*(1-tt)*pA.y + 2*(1-tt)*tt*midY + tt*tt*pB.y;
          s === 0 ? ctx.moveTo(bx, by) : ctx.lineTo(bx, by);
        }
        ctx.strokeStyle = `rgba(245,190,10,${0.5 - arc.progress * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        // Dot at tip
        if (stop > 0) {
          const tip = stop / steps;
          const bx = (1-tip)*(1-tip)*pA.x + 2*(1-tip)*tip*midX + tip*tip*pB.x;
          const by = (1-tip)*(1-tip)*pA.y + 2*(1-tip)*tip*midY + tip*tip*pB.y;
          ctx.beginPath();
          ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,210,50,0.9)';
          ctx.fill();
        }
      });

      t++;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden" style={{ background: '#000' }}>
      <canvas ref={canvasRef} className="w-full" style={{ display: 'block', maxHeight: '420px' }} />
    </div>
  );
}

export default function ApplyAnywhereSection() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
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
        <p
          className="text-foreground/60 max-w-xl mx-auto mb-12"
          style={{ fontSize: '18px', lineHeight: '1.5' }}
        >
          If a human can apply, Just Apply can apply.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {boards.map((board) => (
            <span
              key={board}
              className="px-4 py-2 rounded-full border border-border text-sm font-semibold text-foreground/70 transition-all duration-200 hover:text-foreground"
              style={{ background: 'var(--card)' }}
            >
              {board}
            </span>
          ))}
        </div>

        <GlobeIllustration />
      </div>
    </section>
  );
}