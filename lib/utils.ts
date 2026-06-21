let off = false;
let count: number = 0;

export function loggingOff() {
    off = true;
}

export function loggingOn() {
    off = false;
}

export function log(...args: unknown[]) {
    if (off) return;

    console.log(`[${++count}]`, ...args);
}
