(function () {
  const input = document.getElementById('jwt-input');
  const errorEl = document.getElementById('error');
  const resultEl = document.getElementById('result');
  const headerEl = document.getElementById('header-json');
  const payloadEl = document.getElementById('payload-json');
  const sigEl = document.getElementById('signature-raw');
  const expEl = document.getElementById('exp-status');

  function base64UrlDecode(value) {
    let normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    while (normalized.length % 4) normalized += '=';

    const raw = atob(normalized);
    try {
      return decodeURIComponent(
        raw
          .split('')
          .map((character) => `%${character.charCodeAt(0).toString(16).padStart(2, '0')}`)
          .join(''),
      );
    } catch (error) {
      return raw;
    }
  }

  function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
    resultEl.classList.add('hidden');
  }

  function decode() {
    const token = input.value.trim();
    if (!token) {
      errorEl.classList.add('hidden');
      resultEl.classList.add('hidden');
      return;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      showError("That doesn't look like a JWT — expected 3 dot-separated parts (header.payload.signature).");
      return;
    }

    let header;
    let payload;

    try {
      header = JSON.parse(base64UrlDecode(parts[0]));
    } catch (error) {
      showError('Could not decode the header — check that it\'s valid base64url JSON.');
      return;
    }

    try {
      payload = JSON.parse(base64UrlDecode(parts[1]));
    } catch (error) {
      showError('Could not decode the payload — check that it\'s valid base64url JSON.');
      return;
    }

    errorEl.classList.add('hidden');
    resultEl.classList.remove('hidden');
    headerEl.textContent = JSON.stringify(header, null, 2);
    payloadEl.textContent = JSON.stringify(payload, null, 2);
    sigEl.textContent = parts[2];

    if (typeof payload.exp === 'number') {
      const expirationDate = new Date(payload.exp * 1000);
      const isExpired = Date.now() > expirationDate.getTime();
      expEl.classList.remove('hidden', 'valid', 'expired');
      expEl.classList.add(isExpired ? 'expired' : 'valid');
      expEl.textContent = `${isExpired ? 'Expired ' : 'Valid until '}${expirationDate.toLocaleString()}`;
    } else {
      expEl.classList.add('hidden');
    }
  }

  input.addEventListener('input', decode);

  document.querySelectorAll('[data-copy-target]').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      await navigator.clipboard.writeText(target.textContent);

      const original = button.textContent;
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = original;
      }, 1200);
    });
  });

  const fromQuery = new URLSearchParams(window.location.search).get('token');
  input.value = fromQuery || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  decode();
})();
