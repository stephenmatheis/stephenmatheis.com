// localStorage.clear();

// Set theme
setMode();

// Set data attributes
['light-theme', 'dark-theme', 'font-family', 'font-size'].forEach((att) =>
    setDataAttribute(att)
);

// DEV:
// // Set Meta theme
// const metaTheme = localStorage.getItem('meta-theme');

// console.log(metaTheme);

// if (metaTheme) {
//     document
//         .querySelector('meta[name="theme-color"]')
//         .setAttribute('content', metaTheme);
// }

// Don't animate transitions on load
setTimeout(() => {
    document.body.classList.add('can-transition');
}, 250);

function setMode() {
    const localMode = localStorage.getItem('prefers-color-scheme');

    // DEV:
    // if (!localMode) {
    //     document.documentElement.setAttribute(
    //         'data-prefers-color-scheme',
    //         'Dark'
    //     );

    //     return;
    // }

    if (localMode === 'Light' || localMode === 'Dark') {
        setModeValue(localMode);
        return;
    }
}

function setModeValue(mode) {
    localStorage.setItem('prefers-color-scheme', mode);
    document.documentElement.setAttribute('data-prefers-color-scheme', mode);
}

function setDataAttribute(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return;
    }

    // Set data attribute
    document.documentElement.setAttribute(`data-${key}`, value);
}

function setLocalSetting(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return;
    }

    // Set CSS varaible
    document.documentElement.style.setProperty(`--${key}`, value);
}
