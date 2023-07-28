import variables from '@/styles/exports.module.scss';

function getMap(str: string) {
    const [color, values] = str.split(' - ');
    const names = values
        .split(',')
        .filter((x) => x)
        .map((name) => {
            const [key, value] = name.split(' > ');
            return `"${key}": "${value}"`;
        });

    return {
        name: color.trim(),
        values: JSON.parse(`{ ${names.join(', ')} }`),
    };
}

function getColors(colors: string) {
    return colors.split('|').map(getMap);
}

export function getThemes() {
    return {
        Dark: getColors(variables.Dark),
        Light: getColors(variables.Light),
    };
}

export function getDarkThemes() {
    return getThemes().Light;
}

export function getDarkThemeNames() {
    return getDarkThemes().map(({ name }) => name);
}

export function getLightThemes() {
    return getThemes().Dark;
}

export function getLightThemeNames() {
    return getLightThemes().map(({ name }) => name);
}
