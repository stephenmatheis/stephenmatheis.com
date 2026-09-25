/**
 * Sound effects, generated in code with the Web Audio API, so there are no
 * audio files to download.
 *
 * Browsers won't play sound until the visitor has interacted with the page
 * (a click or a key press), so nothing here runs on load. The AudioContext,
 * which is the browser's audio engine, is only created the first time a
 * sound is actually requested, and that's always in response to a click or
 * key press.
 */

let sharedContext: AudioContext | null = null;

export function audioContext() {
    sharedContext ??= new AudioContext();

    // A context created before the visitor interacted starts "suspended".
    // Resuming inside a click or key handler is allowed.
    if (sharedContext.state === 'suspended') {
        void sharedContext.resume();
    }

    return sharedContext;
}

/**
 * A buffer of white noise: random samples between -1 and 1. Played quickly
 * it sounds like a hiss, the raw material for static, clicks, and clunks.
 */
export function noiseBuffer(context: AudioContext, seconds: number) {
    const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * seconds), context.sampleRate);
    const samples = buffer.getChannelData(0);

    for (let index = 0; index < samples.length; index++) {
        samples[index] = Math.random() * 2 - 1;
    }

    return buffer;
}

/**
 * A short mechanical click: a burst of noise that fades out fast, pushed
 * through a filter so it sounds like plastic instead of hiss. Lower
 * `pitch` values sound heavier, more like a clunk.
 */
export function playClick({ pitch = 2000, volume = 0.4, length = 0.06 } = {}) {
    const context = audioContext();
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    source.buffer = noiseBuffer(context, length);
    filter.type = 'bandpass';
    filter.frequency.value = pitch;

    // Start loud and fall to silence: that sharp decay is what makes it a click.
    gain.gain.setValueAtTime(volume, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + length);

    source.connect(filter).connect(gain).connect(context.destination);
    source.start();
}

/**
 * Plays steady tones (sine waves) at the given frequencies, mixed together,
 * for `seconds`. Phone sounds are built from pairs of tones like this.
 */
export function playTones(frequencies: number[], seconds: number, volume = 0.08) {
    const context = audioContext();
    const gain = context.createGain();

    gain.gain.value = volume;
    gain.connect(context.destination);

    for (const frequency of frequencies) {
        const oscillator = context.createOscillator();

        oscillator.frequency.value = frequency;
        oscillator.connect(gain);
        oscillator.start();
        oscillator.stop(context.currentTime + seconds);
    }
}
