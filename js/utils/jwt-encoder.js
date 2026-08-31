(function () {
  const headerInput = document.getElementById('header-input');
  const payloadInput = document.getElementById('payload-input');
  const secretInput = document.getElementById('secret-input');
  const toggleButton = document.getElementById('toggle-secret');
  const errorEl = document.getElementById('error');
  const resultEl = document.getElementById('result');
  const tokenEl = document.getElementById('token-output');
  const copyButton = document.getElementById('copy-token');
  const decoderLink = document.getElementById('open-in-decoder');

  const algorithms = ['HS256', 'HS384', 'HS512'];
  const hashByAlgorithm = {
    HS256: 'SHA-256',
    HS384: 'SHA-384',
    HS512: 'SHA-512',
  };

  function base64UrlFromBytes(bytes) {
    let binary = '';
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });

    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  function base64UrlFromString(value) {
    return base64UrlFromBytes(new TextEncoder().encode(value));
  }

  function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
    resultEl.classList.add('hidden');
  }

  async function encode() {
    let header;
    let payload;

    try {
      header = JSON.parse(headerInput.value);
    } catch (error) {
      showError('Header must be valid JSON.');
      return;
    }

    try {
      payload = JSON.parse(payloadInput.value);
    } catch (error) {
      showError('Payload must be valid JSON.');
      return;
    }

    const hash = hashByAlgorithm[header.alg];
    if (!hash) {
      showError('Unsupported "alg" — this tool signs HS256, HS384, or HS512 only.');
      return;
    }

    const secret = secretInput.value;
    if (!secret) {
      showError('Enter a secret to sign with.');
      return;
    }

    try {
      const signingInput = `${base64UrlFromString(JSON.stringify(header))}.${base64UrlFromString(JSON.stringify(payload))}`;
      const key = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(secret),
        { name: 'HMAC', hash },
        false,
        ['sign'],
      );
      const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signingInput));
      const token = `${signingInput}.${base64UrlFromBytes(new Uint8Array(signature))}`;

      errorEl.classList.add('hidden');
      resultEl.classList.remove('hidden');
      tokenEl.textContent = token;
      decoderLink.href = `/html/utils/jwt-decoder.html?token=${encodeURIComponent(token)}`;
    } catch (error) {
      showError(`Signing failed: ${error.message}`);
    }
  }

  let debounceId;
  function scheduleEncode() {
    clearTimeout(debounceId);
    debounceId = setTimeout(encode, 150);
  }

  toggleButton.addEventListener('click', () => {
    const isPassword = secretInput.type === 'password';
    secretInput.type = isPassword ? 'text' : 'password';
    toggleButton.textContent = isPassword ? 'Hide' : 'Show';
  });

  document.getElementById('generate-header').addEventListener('click', () => {
    const algorithm = algorithms[Math.floor(Math.random() * algorithms.length)];
    headerInput.value = JSON.stringify({ alg: algorithm, typ: 'JWT' }, null, 2);
    scheduleEncode();
  });

  document.getElementById('generate-secret').addEventListener('click', () => {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    secretInput.value = base64UrlFromBytes(bytes);
    secretInput.type = 'text';
    toggleButton.textContent = 'Hide';
    scheduleEncode();
  });

  [headerInput, payloadInput, secretInput].forEach((element) => {
    element.addEventListener('input', scheduleEncode);
  });

  copyButton.addEventListener('click', async () => {
    await navigator.clipboard.writeText(tokenEl.textContent);

    const original = copyButton.textContent;
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
      copyButton.textContent = original;
    }, 1200);
  });

  encode();
})();
