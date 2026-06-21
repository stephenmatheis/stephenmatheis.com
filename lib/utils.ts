let count: number = 0;

export function log(...args: unknown[]) {
    console.log(`[${++count}]`, ...args);
}
