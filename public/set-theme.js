setMode();
['font-size'].forEach((variable) => setLocalSetting(variable));
['light-theme', 'dark-theme', 'font-family'].forEach((att) =>
    setDataAttribute(att)
);

setTimeout(() => {
    document.body.classList.add('can-transition');
}, 250);

function setMode() {
    const localMode = localStorage.getItem('prefers-color-scheme');

    if (localMode === 'Light' || localMode === 'Dark') {
        setModeValue(localMode);
        return;
    }

    return;

    if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
        setModeValue('Dark');
    } else {
        setModeValue('Light');
    }
}

function setModeValue(mode) {
    localStorage.setItem('prefers-color-scheme', mode);
    document.documentElement.setAttribute('data-prefers-color-scheme', mode);
}

function setLocalSetting(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return;
    }

    // Set CSS Varaible
    document.documentElement.style.setProperty(`--${key}`, value);
}

function setDataAttribute(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return;
    }

    // Set CSS Varaible
    document.documentElement.setAttribute(`data-${key}`, value);
}
