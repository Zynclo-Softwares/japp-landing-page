import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CARD_DATA = [
  { label: 'JD Parser',        sub: 'Match: 94%',         color: 0x4ade80, angle: 0 },
  { label: 'Company Dossier',  sub: 'TechCorp Inc.',      color: 0x60a5fa, angle: Math.PI * 0.55 },
  { label: 'Cover Letter',     sub: 'Letterhead ready',   color: 0xfbbf24, angle: Math.PI },
  { label: 'Job Tracker',      sub: 'Applied · 10/28',    color: 0xa78bfa, angle: Math.PI * 1.55 },
];

function makeRoundedRect(w, h, r) {
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2 + r, -h / 2);
  shape.lineTo(w / 2 - r, -h / 2);
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  shape.lineTo(w / 2, h / 2 - r);
  shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  shape.lineTo(-w / 2 + r, h / 2);
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  shape.lineTo(-w / 2, -h / 2 + r);
  shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  return shape;
}

function makeCardTexture(label, sub, accentColor, width = 512, height = 340) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Glass background
  ctx.clearRect(0, 0, width, height);
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, 'rgba(255,255,255,0.13)');
  grad.addColorStop(1, 'rgba(255,255,255,0.06)');
  ctx.fillStyle = grad;
  roundRect(ctx, 0, 0, width, height, 32);
  ctx.fill();

  // Accent top bar
  const hex = '#' + accentColor.toString(16).padStart(6, '0');
  ctx.fillStyle = hex + 'cc';
  roundRect(ctx, 0, 0, width, 10, { tl: 32, tr: 32, bl: 0, br: 0 });
  ctx.fill();

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 42px sans-serif';
  ctx.fillText(label, 36, 80);

  // Sub
  ctx.fillStyle = hex;
  ctx.font = '30px sans-serif';
  ctx.fillText(sub, 36, 126);

  // Fake text lines
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  [[36, 170, 300], [36, 200, 240], [36, 230, 280], [36, 260, 200], [36, 290, 260]].forEach(([x, y, w]) => {
    roundRect(ctx, x, y, w, 14, 7);
    ctx.fill();
  });

  // Window dots
  [0, 22, 44].forEach((dx, i) => {
    ctx.fillStyle = ['#ff5f57', '#febc2e', '#28c840'][i];
    ctx.beginPath();
    ctx.arc(width - 60 + dx, 32, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  return new THREE.CanvasTexture(canvas);
}

function makeCenterTexture(width = 512, height = 680) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, 'rgba(255,255,255,0.18)');
  grad.addColorStop(1, 'rgba(255,255,255,0.07)');
  ctx.fillStyle = grad;
  roundRect(ctx, 0, 0, width, height, 36);
  ctx.fill();

  // Amber top stripe
  ctx.fillStyle = 'oklch(0.852 0.199 91.936)';
  ctx.fillStyle = '#F5C800cc';
  roundRect(ctx, 0, 0, width, 12, { tl: 36, tr: 36, bl: 0, br: 0 });
  ctx.fill();

  // Avatar circle
  ctx.fillStyle = '#F5C800aa';
  ctx.beginPath();
  ctx.arc(80, 90, 44, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText('SC', 60, 103);

  // Name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 46px sans-serif';
  ctx.fillText('Sarah Chen', 148, 80);
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = '28px sans-serif';
  ctx.fillText('Marketing Director', 148, 116);

  // Section lines
  ctx.fillStyle = '#F5C800';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('Profile', 36, 180);
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  [[36, 200, 440, 14], [36, 224, 400, 14], [36, 248, 420, 14]].forEach(([x, y, w, h]) => {
    roundRect(ctx, x, y, w, h, 7); ctx.fill();
  });

  ctx.fillStyle = '#F5C800';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('Experience', 36, 300);
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  [[36, 320, 380, 14], [36, 344, 340, 14], [36, 368, 360, 14], [36, 392, 300, 14]].forEach(([x, y, w, h]) => {
    roundRect(ctx, x, y, w, h, 7); ctx.fill();
  });

  ctx.fillStyle = '#F5C800';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('Skills', 36, 440);
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  [[36, 460, 260, 14], [36, 484, 220, 14], [36, 508, 240, 14]].forEach(([x, y, w, h]) => {
    roundRect(ctx, x, y, w, h, 7); ctx.fill();
  });

  // Ready badge
  ctx.fillStyle = '#F5C800';
  roundRect(ctx, 36, height - 64, 120, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#3d2800';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('Ready', 52, height - 40);

  return new THREE.CanvasTexture(canvas);
}

function roundRect(ctx, x, y, w, h, r) {
  if (typeof r === 'number') r = { tl: r, tr: r, bl: r, br: r };
  ctx.beginPath();
  ctx.moveTo(x + r.tl, y);
  ctx.lineTo(x + w - r.tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr);
  ctx.lineTo(x + w, y + h - r.br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
  ctx.lineTo(x + r.bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl);
  ctx.lineTo(x, y + r.tl);
  ctx.quadraticCurveTo(x, y, x + r.tl, y);
  ctx.closePath();
}

export default function HeroScene3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth;
    const H = el.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0.5, 7);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const point = new THREE.PointLight(0xF5C800, 2.5, 12);
    point.position.set(0, -1.5, 3);
    scene.add(point);
    const rim = new THREE.DirectionalLight(0xffffff, 0.4);
    rim.position.set(-3, 3, 2);
    scene.add(rim);

    // Amber glow plane at bottom
    const glowGeo = new THREE.PlaneGeometry(3, 1);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xF5C800,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.set(0, -2.1, 0.1);
    glow.rotation.x = -Math.PI / 6;
    scene.add(glow);

    // Card material helper
    const glassMat = (tex) => new THREE.MeshPhysicalMaterial({
      map: tex,
      transparent: true,
      opacity: 0.88,
      roughness: 0.1,
      metalness: 0.0,
      transmission: 0.15,
      side: THREE.FrontSide,
    });

    // Center card
    const cW = 1.6, cH = 2.1;
    const centerGeo = new THREE.ShapeGeometry(makeRoundedRect(cW, cH, 0.12));
    const centerTex = makeCenterTexture();
    const centerMesh = new THREE.Mesh(centerGeo, glassMat(centerTex));
    centerMesh.position.set(0, 0.1, 0);
    scene.add(centerMesh);

    // Thin border glow for center
    const borderGeo = new THREE.ShapeGeometry(makeRoundedRect(cW + 0.02, cH + 0.02, 0.13));
    const borderMat = new THREE.MeshBasicMaterial({ color: 0xF5C800, transparent: true, opacity: 0.25, side: THREE.FrontSide });
    const border = new THREE.Mesh(borderGeo, borderMat);
    border.position.set(0, 0.1, -0.01);
    scene.add(border);

    // Satellite cards
    const ORBIT_R = 2.8;
    const ORBIT_Y = -0.2;
    const satellites = CARD_DATA.map(({ label, sub, color, angle }) => {
      const sW = 1.15, sH = 0.8;
      const geo = new THREE.ShapeGeometry(makeRoundedRect(sW, sH, 0.1));
      const tex = makeCardTexture(label, sub, color);
      const mesh = new THREE.Mesh(geo, glassMat(tex));
      mesh.position.set(
        Math.sin(angle) * ORBIT_R,
        ORBIT_Y + Math.sin(angle * 0.7) * 0.4,
        Math.cos(angle) * ORBIT_R * 0.4 - 0.5
      );
      // Slight tilt
      mesh.rotation.y = -angle * 0.18;
      mesh.rotation.x = 0.08;
      scene.add(mesh);

      // Border
      const bGeo = new THREE.ShapeGeometry(makeRoundedRect(sW + 0.02, sH + 0.02, 0.11));
      const bMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3 });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.copy(mesh.position);
      bMesh.position.z -= 0.005;
      bMesh.rotation.copy(mesh.rotation);
      scene.add(bMesh);

      return { mesh, bMesh, baseAngle: angle, baseY: mesh.position.y };
    });

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    el.addEventListener('mousemove', onMouseMove, { passive: true });

    // Animate
    let t = 0;
    const animate = () => {
      t += 0.008;

      // Gentle camera sway
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.3 + 0.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Center card gentle float
      centerMesh.position.y = 0.1 + Math.sin(t * 0.9) * 0.06;
      border.position.y = centerMesh.position.y;
      centerMesh.rotation.y = Math.sin(t * 0.4) * 0.04 + mouse.x * 0.04;

      // Satellite float
      satellites.forEach(({ mesh, bMesh, baseAngle, baseY }, i) => {
        mesh.position.y = baseY + Math.sin(t + i * 1.2) * 0.08;
        bMesh.position.y = mesh.position.y;
      });

      // Glow pulse
      glowMat.opacity = 0.14 + Math.sin(t * 1.2) * 0.06;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    let rafId = requestAnimationFrame(animate);

    // Resize
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full rounded-3xl overflow-hidden"
      style={{ height: '480px' }}
    />
  );
}