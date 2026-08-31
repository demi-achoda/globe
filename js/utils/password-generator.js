(function () {
  const characterSets = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()-_=+[]{};:,.?/~',
  };
  const ambiguousCharacters = new Set('Il1O0o'.split(''));

  const lengthInput = document.getElementById('password-length');
  const lengthOutput = document.getElementById('password-length-value');
  const generateButton = document.getElementById('generate-password');
  const passwordOutput = document.getElementById('password-output');
  const copyButton = document.getElementById('copy-password');
  const copyStatus = document.getElementById('copy-status');
  const errorEl = document.getElementById('error');
  const strengthLabel = document.getElementById('strength-label');
  const entropyLabel = document.getElementById('entropy-label');
  const strengthFill = document.getElementById('strength-fill');
  const optionInputs = {
    lowercase: document.getElementById('include-lowercase'),
    uppercase: document.getElementById('include-uppercase'),
    numbers: document.getElementById('include-numbers'),
    symbols: document.getElementById('include-symbols'),
  };
  const excludeAmbiguousInput = document.getElementById('exclude-ambiguous');

  let statusTimer;

  function secureRandomIndex(maximum) {
    if (!Number.isInteger(maximum) || maximum < 1 || maximum > 256) {
      throw new RangeError('The random selection pool must contain 1 to 256 characters.');
    }

    const upperBound = 256 - (256 % maximum);
    const randomByte = new Uint8Array(1);

    do {
      crypto.getRandomValues(randomByte);
    } while (randomByte[0] >= upperBound);

    return randomByte[0] % maximum;
  }

  function pickCharacter(characters) {
    return characters[secureRandomIndex(characters.length)];
  }

  function secureShuffle(values) {
    for (let index = values.length - 1; index > 0; index -= 1) {
      const randomIndex = secureRandomIndex(index + 1);
      [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
    }
    return values;
  }

  function selectedGroups() {
    const excludeAmbiguous = excludeAmbiguousInput.checked;
    return Object.entries(optionInputs)
      .filter(([, input]) => input.checked)
      .map(([name]) => {
        const characters = characterSets[name];
        return excludeAmbiguous
          ? [...characters].filter((character) => !ambiguousCharacters.has(character)).join('')
          : characters;
      });
  }

  function strengthFor(entropy) {
    if (entropy < 40) return { label: 'Weak', width: 25, color: '#ff8a8a' };
    if (entropy < 60) return { label: 'Fair', width: 50, color: '#ffd166' };
    if (entropy < 80) return { label: 'Strong', width: 75, color: '#77c8ff' };
    return { label: 'Very strong', width: 100, color: '#7ee7a8' };
  }

  function updateStrength(length, poolSize) {
    const entropy = poolSize ? length * Math.log2(poolSize) : 0;
    const strength = strengthFor(entropy);
    strengthLabel.textContent = strength.label;
    entropyLabel.textContent = `${Math.round(entropy)} bits estimated entropy`;
    strengthFill.style.width = `${strength.width}%`;
    strengthFill.style.backgroundColor = strength.color;
  }

  function clearResult() {
    passwordOutput.value = '';
    copyButton.disabled = true;
    strengthLabel.textContent = 'Strength';
    entropyLabel.textContent = '0 bits estimated entropy';
    strengthFill.style.width = '0';
  }

  function generatePassword() {
    const groups = selectedGroups();
    if (groups.length === 0) {
      errorEl.textContent = 'Select at least one character group.';
      errorEl.classList.remove('hidden');
      clearResult();
      return;
    }

    const length = Number(lengthInput.value);
    if (length < groups.length) {
      errorEl.textContent = `Use at least ${groups.length} characters to include every selected group.`;
      errorEl.classList.remove('hidden');
      clearResult();
      return;
    }

    errorEl.classList.add('hidden');
    const pool = [...new Set(groups.join(''))].join('');
    const password = groups.map(pickCharacter);

    while (password.length < length) {
      password.push(pickCharacter(pool));
    }

    passwordOutput.value = secureShuffle(password).join('');
    copyButton.disabled = false;
    updateStrength(length, pool.length);
  }

  function setStatus(message) {
    clearTimeout(statusTimer);
    copyStatus.textContent = message;
    statusTimer = setTimeout(() => {
      copyStatus.textContent = '';
    }, 1800);
  }

  lengthInput.addEventListener('input', () => {
    const length = Number(lengthInput.value);
    lengthOutput.textContent = `${length} ${length === 1 ? 'character' : 'characters'}`;
    generatePassword();
  });

  Object.values(optionInputs).forEach((input) => input.addEventListener('change', generatePassword));
  excludeAmbiguousInput.addEventListener('change', generatePassword);
  generateButton.addEventListener('click', generatePassword);

  copyButton.addEventListener('click', async () => {
    if (!passwordOutput.value) return;

    try {
      await navigator.clipboard.writeText(passwordOutput.value);
      setStatus('Password copied');
    } catch (error) {
      setStatus('Clipboard access was blocked — select and copy it manually.');
    }
  });

  generatePassword();
})();
