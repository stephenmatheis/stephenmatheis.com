// Toggle theme
const toggle = document.querySelector('#toggle');

// Detect user preference
if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        toggleMode('light');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleMode('dark');
    }
} else {
    toggleMode('light');
}

// Add theme override event listener
toggle.addEventListener('change', event => {
    const state = event.target.checked;
    
    if (state) {
        setMode('dark');
    } else {
        setMode('light')
    }
});

// Automatically set theme based on local time of day - https://codepen.io/mrozilla/pen/OJJNjRb
const hours = new Date().getHours();

if (hours < 7 || hours > 19) {
    toggleMode('dark');
}

function toggleMode(mode) {
    toggle.checked = mode === 'light' ? false : true;
    setMode(mode);
}

function setMode(mode) {
    document.querySelector('html').dataset.theme = mode;
    document.querySelector("link[rel='apple-touch-icon']").href = `favicons/${mode}/apple-touch-icon.png`;
    document.querySelector("link[rel='icon'][sizes='32x32']").href = `favicons/${mode}/favicon-32x32.png`;
    document.querySelector("link[rel='icon'][sizes='16x16']").href = `favicons/${mode}/favicon-16x16.png`;
}