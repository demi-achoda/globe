(function () {
  const form = document.getElementById('palette-form');
  const seedColorInput = document.getElementById('seed-color');
  const hexInput = document.getElementById('hex-input');
  const harmonySelect = document.getElementById('harmony-select');
  const sizeInput = document.getElementById('palette-size');
  const sizeOutput = document.getElementById('palette-size-value');
  const randomizeButton = document.getElementById('randomize-seed');
  const copyCssButton = document.getElementById('copy-css');
  const paletteGrid = document.getElementById('palette-grid');
  const cssOutput = document.getElementById('css-output');
  const errorEl = document.getElementById('error');
  const copyStatus = document.getElementById('copy-status');

  let statusTimer;

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function wrapHue(value) {
    return ((value % 360) + 360) % 360;
  }

  function normalizeHex(value) {
    const trimmed = value.trim().replace(/^#/, '');
    if (/^[0-9a-f]{3}$/i.test(trimmed)) {
      return `#${trimmed.split('').map((character) => character + character).join('')}`.toUpperCase();
    }
    if (/^[0-9a-f]{6}$/i.test(trimmed)) {
      return `#${trimmed}`.toUpperCase();
    }
    return null;
  }

  function hexToHsl(hex) {
    const red = parseInt(hex.slice(1, 3), 16) / 255;
    const green = parseInt(hex.slice(3, 5), 16) / 255;
    const blue = parseInt(hex.slice(5, 7), 16) / 255;
    const maximum = Math.max(red, green, blue);
    const minimum = Math.min(red, green, blue);
    const delta = maximum - minimum;
    const lightness = (maximum + minimum) / 2;
    let hue = 0;

    if (delta !== 0) {
      if (maximum === red) hue = 60 * (((green - blue) / delta) % 6);
      if (maximum === green) hue = 60 * ((blue - red) / delta + 2);
      if (maximum === blue) hue = 60 * ((red - green) / delta + 4);
    }

    const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
    return {
      h: wrapHue(hue),
      s: saturation * 100,
      l: lightness * 100,
    };
  }

  function hslToHex(hue, saturation, lightness) {
    const normalizedHue = wrapHue(hue);
    const normalizedSaturation = clamp(saturation, 0, 100) / 100;
    const normalizedLightness = clamp(lightness, 0, 100) / 100;
    const chroma = (1 - Math.abs(2 * normalizedLightness - 1)) * normalizedSaturation;
    const section = normalizedHue / 60;
    const secondary = chroma * (1 - Math.abs((section % 2) - 1));
    let red = 0;
    let green = 0;
    let blue = 0;

    if (section < 1) [red, green, blue] = [chroma, secondary, 0];
    else if (section < 2) [red, green, blue] = [secondary, chroma, 0];
    else if (section < 3) [red, green, blue] = [0, chroma, secondary];
    else if (section < 4) [red, green, blue] = [0, secondary, chroma];
    else if (section < 5) [red, green, blue] = [secondary, 0, chroma];
    else [red, green, blue] = [chroma, 0, secondary];

    const match = normalizedLightness - chroma / 2;
    return `#${[red, green, blue]
      .map((channel) => Math.round((channel + match) * 255).toString(16).padStart(2, '0'))
      .join('')}`.toUpperCase();
  }

  function harmonyOffsets(harmony, count) {
    const families = {
      complementary: [0, 180],
      triadic: [0, 120, 240],
      'split-complementary': [0, 150, 210],
      tetradic: [0, 60, 180, 240],
    };

    if (harmony === 'analogous') {
      return Array.from({ length: count }, (_, index) => -44 + (88 * index) / (count - 1));
    }

    const family = families[harmony] || [0];
    return Array.from({ length: count }, (_, index) => {
      const ring = Math.floor(index / family.length);
      const direction = index % 2 === 0 ? 1 : -1;
      return family[index % family.length] + ring * direction * 14;
    });
  }

  function buildPalette(seedHex, harmony, count) {
    const seed = hexToHsl(seedHex);

    if (harmony === 'monochromatic') {
      return Array.from({ length: count }, (_, index) => {
        const lightness = 22 + (60 * index) / (count - 1);
        return hslToHex(seed.h, Math.max(seed.s, 18), lightness);
      });
    }

    return harmonyOffsets(harmony, count).map((offset, index) => {
      const center = (count - 1) / 2;
      const lightnessShift = (index - center) * 3.5;
      const saturationShift = index % 2 === 0 ? 3 : -5;
      return hslToHex(
        seed.h + offset,
        clamp(seed.s + saturationShift, 18, 96),
        clamp(seed.l + lightnessShift, 20, 82),
      );
    });
  }

  function setStatus(message) {
    clearTimeout(statusTimer);
    copyStatus.textContent = message;
    statusTimer = setTimeout(() => {
      copyStatus.textContent = '';
    }, 1800);
  }

  async function copyText(value, successMessage) {
    try {
      await navigator.clipboard.writeText(value);
      setStatus(successMessage);
    } catch (error) {
      setStatus('Clipboard access was blocked — copy it from the CSS panel.');
    }
  }

  function renderPalette(colors) {
    paletteGrid.replaceChildren();

    colors.forEach((color, index) => {
      const swatch = document.createElement('button');
      swatch.className = 'palette-swatch';
      swatch.type = 'button';
      swatch.style.setProperty('--swatch-color', color);
      swatch.setAttribute('aria-label', `Copy ${color}`);

      const colorBlock = document.createElement('span');
      colorBlock.className = 'swatch-color';
      colorBlock.setAttribute('aria-hidden', 'true');

      const metadata = document.createElement('span');
      metadata.className = 'swatch-meta';

      const label = document.createElement('strong');
      label.textContent = color;

      const action = document.createElement('span');
      action.textContent = 'COPY';

      metadata.append(label, action);
      swatch.append(colorBlock, metadata);
      swatch.addEventListener('click', () => copyText(color, `Copied ${color}`));
      paletteGrid.append(swatch);
    });

    const css = `:root {\n${colors.map((color, index) => `  --palette-${index + 1}: ${color};`).join('\n')}\n}`;
    cssOutput.textContent = css;
    copyCssButton.dataset.css = css;
  }

  function generatePalette() {
    const seedHex = normalizeHex(hexInput.value);
    if (!seedHex) {
      errorEl.textContent = 'Enter a valid 3- or 6-digit hexadecimal color.';
      errorEl.classList.remove('hidden');
      return;
    }

    errorEl.classList.add('hidden');
    hexInput.value = seedHex;
    seedColorInput.value = seedHex.toLowerCase();
    const count = Number(sizeInput.value);
    const colors = buildPalette(seedHex, harmonySelect.value, count);
    renderPalette(colors);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    generatePalette();
  });

  seedColorInput.addEventListener('input', () => {
    hexInput.value = seedColorInput.value.toUpperCase();
    generatePalette();
  });

  hexInput.addEventListener('change', generatePalette);
  harmonySelect.addEventListener('change', generatePalette);

  sizeInput.addEventListener('input', () => {
    sizeOutput.textContent = `${sizeInput.value} colors`;
    generatePalette();
  });

  randomizeButton.addEventListener('click', () => {
    const bytes = new Uint8Array(3);
    crypto.getRandomValues(bytes);
    const hex = `#${Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
    hexInput.value = hex;
    seedColorInput.value = hex.toLowerCase();
    generatePalette();
  });

  copyCssButton.addEventListener('click', () => {
    copyText(copyCssButton.dataset.css || '', 'CSS variables copied');
  });

  generatePalette();
})();
