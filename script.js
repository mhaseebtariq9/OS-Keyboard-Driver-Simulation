const keyInput = document.getElementById('keyInput');
const keyName = document.getElementById('keyName');
const scanCode = document.getElementById('scanCode');
const keyType = document.getElementById('keyType');
const keyMessage = document.getElementById('keyMessage');
const keyTime = document.getElementById('keyTime');
const keyLog = document.getElementById('keyLog');
const clearBtn = document.getElementById('clearBtn');

let isShiftPressed = false;

// Map of special keys
const specialKeys = {
    8: 'Backspace',
    9: 'Tab',
    13: 'Enter',
    16: 'Shift',
    17: 'Ctrl',
    18: 'Alt',
    20: 'CapsLock',
    32: 'Space',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown'
};

keyInput.addEventListener('keydown', (e) => {
    e.preventDefault();

    const code = e.keyCode;
    const key = specialKeys[code] || e.key;
    const time = new Date().toLocaleTimeString();

    // Track Shift
    if (code === 16) isShiftPressed = true;

    // Update Live Output
    keyName.textContent = key;
    scanCode.textContent = code;
    keyType.textContent = specialKeys[code]? "Special Key" : "Normal Key";
    keyType.className = specialKeys[code]? "badge" : "badge badge-green";
    keyMessage.innerHTML = `Key '${key}' processed successfully ✅`;
    keyTime.textContent = time;

    // Add to Key Log
    const logItem = document.createElement('div');
    logItem.className = 'log-item';
    logItem.innerHTML = `
        <span>● ${time}</span>
        <span>${key} (${code})</span>
        <span class="badge badge-green">${specialKeys[code]? "Special" : "Normal"}</span>
    `;
    keyLog.prepend(logItem);
});

keyInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 16) isShiftPressed = false;
});

// Clear button
clearBtn.addEventListener('click', () => {
    keyLog.innerHTML = '';
});

// Special key buttons at bottom
document.querySelectorAll('.special-keys button').forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.textContent.split(' ')[0];
        const event = new KeyboardEvent('keydown', { key: key });
        keyInput.dispatchEvent(event);
    });
});

// Keep input focused
window.addEventListener('click', () => keyInput.focus());
keyInput.focus();