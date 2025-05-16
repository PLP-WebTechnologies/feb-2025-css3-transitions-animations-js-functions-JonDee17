// DOM Elements
const lightThemeBtn = document.getElementById('light-theme');
const darkThemeBtn = document.getElementById('dark-theme');
const spinBtn = document.getElementById('spin-btn');
const savePrefsBtn = document.getElementById('save-prefs');
const resetPrefsBtn = document.getElementById('reset-prefs');
const usernameInput = document.getElementById('username');
const bgColorInput = document.getElementById('bg-color');
const fontSizeSelect = document.getElementById('font-size');
const flipBtn = document.getElementById('flip-btn');
const flipCard = document.getElementById('flip-card');
const rainbowBtn = document.getElementById('rainbow-btn');
const colorChangeBox = document.getElementById('color-change-box');

// Load saved preferences
function loadPreferences() {
    const savedTheme = localStorage.getItem('theme');
    const savedUsername = localStorage.getItem('username');
    const savedBgColor = localStorage.getItem('bgColor');
    const savedFontSize = localStorage.getItem('fontSize');
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        darkThemeBtn.disabled = true;
    } else {
        document.body.classList.remove('dark-theme');
        lightThemeBtn.disabled = true;
    }
    
    // Apply other preferences
    if (savedUsername) {
        usernameInput.value = savedUsername;
    }
    
    if (savedBgColor) {
        bgColorInput.value = savedBgColor;
        document.documentElement.style.setProperty('--background-color', savedBgColor);
    }
    
    if (savedFontSize) {
        fontSizeSelect.value = savedFontSize;
        document.documentElement.style.setProperty('--font-size', savedFontSize);
    }
}

// Save preferences to localStorage
function savePreferences() {
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const username = usernameInput.value;
    const bgColor = bgColorInput.value;
    const fontSize = fontSizeSelect.value;
    
    localStorage.setItem('theme', theme);
    localStorage.setItem('username', username);
    localStorage.setItem('bgColor', bgColor);
    localStorage.setItem('fontSize', fontSize);
    
    // Apply preferences immediately
    document.documentElement.style.setProperty('--background-color', bgColor);
    document.documentElement.style.setProperty('--font-size', fontSize);
    
    alert('Preferences saved!');
}

// Reset preferences
function resetPreferences() {
    localStorage.clear();
    usernameInput.value = '';
    bgColorInput.value = '#ffffff';
    fontSizeSelect.value = '20px';
    document.body.classList.remove('dark-theme');
    document.documentElement.style.setProperty('--background-color', '#ffffff');
    document.documentElement.style.setProperty('--font-size', '20px');
    lightThemeBtn.disabled = false;
    darkThemeBtn.disabled = false;
    
    alert('Preferences reset to defaults!');
}

// Theme switching
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        darkThemeBtn.disabled = true;
        lightThemeBtn.disabled = false;
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        lightThemeBtn.disabled = true;
        darkThemeBtn.disabled = false;
    }
}

// Animation functions
function triggerSpin() {
    spinBtn.classList.add('clicked');
    setTimeout(() => {
        spinBtn.classList.remove('clicked');
    }, 1000);
}

function flipCardAnimation() {
    flipCard.classList.toggle('flipped');
}

function toggleRainbowMode() {
    document.body.classList.toggle('rainbow-mode');
    colorChangeBox.style.animation = document.body.classList.contains('rainbow-mode') ? 'none' : 'colorChange 8s infinite alternate';
    
    if (document.body.classList.contains('rainbow-mode')) {
        rainbowBtn.textContent = 'Normal Mode';
    } else {
        rainbowBtn.textContent = 'Rainbow Mode';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', loadPreferences);

lightThemeBtn.addEventListener('click', () => setTheme('light'));
darkThemeBtn.addEventListener('click', () => setTheme('dark'));

spinBtn.addEventListener('click', triggerSpin);

savePrefsBtn.addEventListener('click', savePreferences);
resetPrefsBtn.addEventListener('click', resetPreferences);

flipBtn.addEventListener('click', flipCardAnimation);
rainbowBtn.addEventListener('click', toggleRainbowMode);

// Additional animation for color picker
bgColorInput.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--background-color', e.target.value);
});