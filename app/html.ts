import { codeToHtml } from '@pierre/highlights';
import type { Lang, Theme } from '@pierre/highlights';
import { monoDark, monoLight } from './theme';
import { raw } from './raw';

type Options = {
    file: string;
    lang?: Lang | (string & {});
    themes?: {
        light?: Theme;
        dark?: Theme;
    };
};

export function html({ file, lang, themes }: Options) {
    const text = raw(file);
    const bytes = codeToHtml(text, {
        lang: lang || 'tsx',
        themes: {
            light: themes?.light || monoLight,
            dark: themes?.dark || monoDark,
        },
        defaultColor: 'light-dark()',
    });

    return (
        new TextDecoder()
            .decode(bytes)
            .replace(/(https?:\/\/[^\s<"']+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
            // .replace(/(['"])((?:<[^>]+>)*)(\/[a-zA-Z0-9/_-]+)((?:<[^>]+>)*)\1/g, '$1$2<a href="$3">$3</a>$4$1');
            .replace(/(['"])((?:<[^>]+>)*)(\/[a-zA-Z0-9/_-]*)((?:<[^>]+>)*)\1/g, '$1$2<a href="$3">$3</a>$4$1')
    );
}
