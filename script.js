const canvas = document.getElementById("quantumCanvas");
const ctx = canvas.getContext("2d");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let width = 0;
let height = 0;
let particles = [];
let animationFrame = 0;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const particleCount = Math.max(42, Math.min(92, Math.floor((width * height) / 18000)));
  particles = Array.from({ length: particleCount }, (_, index) => {
    const angle = (index / particleCount) * Math.PI * 2;
    const speed = 0.16 + Math.random() * 0.36;

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 1.2 + Math.random() * 2.1,
      phase: Math.random() * Math.PI * 2,
    };
  });
}

function drawField(time = 0) {
  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(87, 215, 255, 0.14)");
  gradient.addColorStop(0.5, "rgba(113, 246, 197, 0.08)");
  gradient.addColorStop(1, "rgba(255, 122, 112, 0.10)");

  for (let i = 0; i < particles.length; i += 1) {
    const a = particles[i];

    if (!prefersReducedMotion.matches) {
      a.x += a.vx + Math.sin(time * 0.0005 + a.phase) * 0.12;
      a.y += a.vy + Math.cos(time * 0.0004 + a.phase) * 0.12;
    }

    if (a.x < -20) a.x = width + 20;
    if (a.x > width + 20) a.x = -20;
    if (a.y < -20) a.y = height + 20;
    if (a.y > height + 20) a.y = -20;

    for (let j = i + 1; j < particles.length; j += 1) {
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.hypot(dx, dy);
      const maxDistance = width < 720 ? 112 : 148;

      if (distance < maxDistance) {
        const alpha = (1 - distance / maxDistance) * 0.24;
        ctx.strokeStyle = `rgba(136, 226, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(a.x, a.y, a.radius + Math.sin(time * 0.002 + a.phase) * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  if (!prefersReducedMotion.matches) {
    animationFrame = requestAnimationFrame(drawField);
  }
}

resizeCanvas();
drawField();

window.addEventListener("resize", () => {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  drawField();
});

prefersReducedMotion.addEventListener("change", () => {
  cancelAnimationFrame(animationFrame);
  drawField();
});
