(function () {
  const canvas = document.getElementById('deep-space-canvas');
  const context = canvas.getContext('2d');
  const retraceButton = document.getElementById('retrace-route');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let stars = [];
  let animationFrame = null;
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function mulberry32(seed) {
    return function random() {
      let value = seed += 0x6D2B79F5;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function seedStars() {
    const random = mulberry32(404);
    const count = clamp(Math.floor((width * height) / 3500), 140, 420);
    stars = Array.from({ length: count }, () => ({
      x: random(),
      y: random(),
      radius: 0.35 + random() * 1.15,
      alpha: 0.18 + random() * 0.72,
      depth: 0.2 + random() * 0.8,
      phase: random() * Math.PI * 2,
      warmth: random() > 0.9,
    }));
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    seedStars();

    if (reducedMotion) render(0);
  }

  function drawBackdrop() {
    const background = context.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, '#070b18');
    background.addColorStop(0.45, '#03050b');
    background.addColorStop(1, '#050817');
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    const nebula = context.createRadialGradient(
      width * 0.68,
      height * 0.58,
      0,
      width * 0.68,
      height * 0.58,
      Math.max(width, height) * 0.58,
    );
    nebula.addColorStop(0, 'rgba(45, 67, 142, 0.13)');
    nebula.addColorStop(0.42, 'rgba(21, 31, 78, 0.055)');
    nebula.addColorStop(1, 'rgba(3, 5, 11, 0)');
    context.fillStyle = nebula;
    context.fillRect(0, 0, width, height);
  }

  function drawStars(time) {
    stars.forEach((star) => {
      const twinkle = reducedMotion ? 1 : 0.72 + Math.sin(time * 0.0012 + star.phase) * 0.28;
      const offsetX = pointer.x * 13 * star.depth;
      const offsetY = pointer.y * 9 * star.depth;
      const x = star.x * width + offsetX;
      const y = star.y * height + offsetY;

      context.beginPath();
      context.arc(x, y, star.radius, 0, Math.PI * 2);
      context.fillStyle = star.warmth
        ? `rgba(255, 210, 158, ${star.alpha * twinkle})`
        : `rgba(198, 211, 255, ${star.alpha * twinkle})`;
      context.fill();
    });
  }

  function drawOrbit(centerX, centerY, radius) {
    context.save();
    context.translate(centerX, centerY);
    context.rotate(-0.34);
    context.setLineDash([3, 9]);
    context.lineWidth = 0.7;
    context.strokeStyle = 'rgba(119, 142, 207, 0.24)';
    context.beginPath();
    context.ellipse(0, 0, radius * 2.3, radius * 0.72, 0, 0, Math.PI * 2);
    context.stroke();
    context.restore();
  }

  function drawContinents(centerX, centerY, radius, drift) {
    context.fillStyle = 'rgba(132, 177, 225, 0.76)';

    context.beginPath();
    context.moveTo(centerX - radius * 0.76 + drift, centerY - radius * 0.42);
    context.bezierCurveTo(
      centerX - radius * 0.36 + drift,
      centerY - radius * 0.72,
      centerX - radius * 0.1 + drift,
      centerY - radius * 0.48,
      centerX - radius * 0.2 + drift,
      centerY - radius * 0.14,
    );
    context.bezierCurveTo(
      centerX - radius * 0.36 + drift,
      centerY + radius * 0.03,
      centerX - radius * 0.28 + drift,
      centerY + radius * 0.3,
      centerX - radius * 0.48 + drift,
      centerY + radius * 0.5,
    );
    context.bezierCurveTo(
      centerX - radius * 0.72 + drift,
      centerY + radius * 0.23,
      centerX - radius * 0.85 + drift,
      centerY - radius * 0.08,
      centerX - radius * 0.76 + drift,
      centerY - radius * 0.42,
    );
    context.fill();

    context.beginPath();
    context.moveTo(centerX + radius * 0.02 + drift, centerY - radius * 0.48);
    context.bezierCurveTo(
      centerX + radius * 0.46 + drift,
      centerY - radius * 0.65,
      centerX + radius * 0.85 + drift,
      centerY - radius * 0.32,
      centerX + radius * 0.65 + drift,
      centerY - radius * 0.06,
    );
    context.bezierCurveTo(
      centerX + radius * 0.42 + drift,
      centerY + radius * 0.04,
      centerX + radius * 0.39 + drift,
      centerY + radius * 0.57,
      centerX + radius * 0.09 + drift,
      centerY + radius * 0.63,
    );
    context.bezierCurveTo(
      centerX - radius * 0.09 + drift,
      centerY + radius * 0.27,
      centerX - radius * 0.15 + drift,
      centerY - radius * 0.19,
      centerX + radius * 0.02 + drift,
      centerY - radius * 0.48,
    );
    context.fill();

    context.beginPath();
    context.ellipse(
      centerX + radius * 0.62 + drift,
      centerY + radius * 0.5,
      radius * 0.2,
      radius * 0.12,
      -0.35,
      0,
      Math.PI * 2,
    );
    context.fill();
  }

  function drawPlanet(time) {
    const compact = width < 760;
    const radius = clamp(Math.min(width, height) * (compact ? 0.066 : 0.073), 34, 70);
    const centerX = width * (compact ? 0.76 : 0.79) + pointer.x * 5;
    const centerY = height * (compact ? 0.76 : 0.7) + pointer.y * 4 + (reducedMotion ? 0 : Math.sin(time * 0.00045) * 3);

    drawOrbit(centerX, centerY, radius);

    const glow = context.createRadialGradient(centerX, centerY, radius * 0.65, centerX, centerY, radius * 2.7);
    glow.addColorStop(0, 'rgba(75, 129, 255, 0.27)');
    glow.addColorStop(0.4, 'rgba(54, 91, 203, 0.09)');
    glow.addColorStop(1, 'rgba(32, 54, 130, 0)');
    context.fillStyle = glow;
    context.beginPath();
    context.arc(centerX, centerY, radius * 2.7, 0, Math.PI * 2);
    context.fill();

    context.save();
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.clip();

    const ocean = context.createRadialGradient(
      centerX - radius * 0.38,
      centerY - radius * 0.42,
      radius * 0.05,
      centerX + radius * 0.12,
      centerY + radius * 0.08,
      radius * 1.24,
    );
    ocean.addColorStop(0, '#6aa3ff');
    ocean.addColorStop(0.38, '#285cbb');
    ocean.addColorStop(0.74, '#102c70');
    ocean.addColorStop(1, '#03091e');
    context.fillStyle = ocean;
    context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

    const drift = reducedMotion ? 0 : Math.sin(time * 0.00012) * radius * 0.08;
    drawContinents(centerX, centerY, radius, drift);

    context.globalAlpha = 0.2;
    context.strokeStyle = '#e7f1ff';
    context.lineWidth = radius * 0.06;
    context.beginPath();
    context.arc(centerX - radius * 0.15, centerY - radius * 0.1, radius * 0.69, 3.85, 5.75);
    context.stroke();
    context.restore();

    context.beginPath();
    context.arc(centerX, centerY, radius + 0.7, 0, Math.PI * 2);
    context.strokeStyle = 'rgba(135, 188, 255, 0.72)';
    context.lineWidth = 1.4;
    context.stroke();

    context.beginPath();
    context.arc(centerX - radius * 0.48, centerY - radius * 0.53, radius * 0.055, 0, Math.PI * 2);
    context.fillStyle = '#ffb454';
    context.shadowColor = '#ffb454';
    context.shadowBlur = 9;
    context.fill();
    context.shadowBlur = 0;
  }

  function render(time) {
    pointer.x += (pointer.targetX - pointer.x) * 0.035;
    pointer.y += (pointer.targetY - pointer.y) * 0.035;
    drawBackdrop();
    drawStars(time);
    drawPlanet(time);

    if (!reducedMotion) animationFrame = requestAnimationFrame(render);
  }

  window.addEventListener('pointermove', (event) => {
    pointer.targetX = event.clientX / Math.max(width, 1) - 0.5;
    pointer.targetY = event.clientY / Math.max(height, 1) - 0.5;
  });

  window.addEventListener('pointerleave', () => {
    pointer.targetX = 0;
    pointer.targetY = 0;
  });

  window.addEventListener('resize', resize);

  retraceButton.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.assign('/html/index.html');
  });

  resize();
  if (!reducedMotion) animationFrame = requestAnimationFrame(render);

  window.addEventListener('pagehide', () => {
    if (animationFrame !== null) cancelAnimationFrame(animationFrame);
  });
})();
