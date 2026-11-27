// app/theme.ts
import type { Theme } from '@pierre/highlights';

const grayLight = '#aaaaaa';

export const mutedLight: Theme = {
    name: 'Mono Light',
    appearance: 'light',
    style: {
        'editor.background': '#ffffff',
        'editor.foreground': '#000000',
        syntax: {
            // Comments
            comment: { color: grayLight },
            'comment.doc': { color: grayLight },

            // Strings & Literals
            string: { color: grayLight },
            'string.escape': { color: grayLight },
            'string.regex': { color: grayLight },
            'string.special': { color: grayLight },
            'string.special.symbol': { color: grayLight },
            number: { color: grayLight },
            boolean: { color: grayLight },
            constant: { color: grayLight },

            // Keywords & Operators
            keyword: { color: grayLight },
            operator: { color: grayLight },
            preproc: { color: grayLight },

            // Identifiers & Variables
            variable: { color: grayLight },
            'variable.parameter': { color: grayLight },
            'variable.special': { color: grayLight },
            property: { color: grayLight },
            label: { color: grayLight },

            // Functions & Types
            function: { color: grayLight },
            'function.method': { color: grayLight },
            'function.builtin': { color: grayLight },
            constructor: { color: grayLight },
            type: { color: grayLight },
            'type.builtin': { color: grayLight },
            enum: { color: grayLight },
            variant: { color: grayLight },

            // Markup / JSX / HTML
            tag: { color: grayLight },
            attribute: { color: grayLight },
            embedded: { color: grayLight },

            // Punctuation
            punctuation: { color: grayLight },
            'punctuation.bracket': { color: grayLight },
            'punctuation.delimiter': { color: grayLight },
            'punctuation.list_marker': { color: grayLight },
            'punctuation.special': { color: grayLight },

            // Prose / Links
            title: { color: grayLight },
            emphasis: { color: grayLight },
            'emphasis.strong': { color: grayLight },
            link_text: { color: grayLight },
            link_uri: { color: grayLight },
            predictive: { color: grayLight },
        },
    },
};

export const monoLight: Theme = {
    name: 'Mono Light',
    appearance: 'light',
    style: {
        'editor.background': '#ffffff',
        'editor.foreground': '#000000',
        syntax: {
            // Comments
            comment: { color: '#000000' },
            'comment.doc': { color: '#000000' },

            // Strings & Literals
            string: { color: '#000000' },
            'string.escape': { color: '#000000' },
            'string.regex': { color: '#000000' },
            'string.special': { color: '#000000' },
            'string.special.symbol': { color: '#000000' },
            number: { color: '#000000' },
            boolean: { color: '#000000' },
            constant: { color: '#000000' },

            // Keywords & Operators
            keyword: { color: '#000000' },
            operator: { color: '#000000' },
            preproc: { color: '#000000' },

            // Identifiers & Variables
            variable: { color: '#000000' },
            'variable.parameter': { color: '#000000' },
            'variable.special': { color: '#000000' },
            property: { color: '#000000' },
            label: { color: '#000000' },

            // Functions & Types
            function: { color: '#000000' },
            'function.method': { color: '#000000' },
            'function.builtin': { color: '#000000' },
            constructor: { color: '#000000' },
            type: { color: '#000000' },
            'type.builtin': { color: '#000000' },
            enum: { color: '#000000' },
            variant: { color: '#000000' },

            // Markup / JSX / HTML
            tag: { color: '#000000' },
            attribute: { color: '#000000' },
            embedded: { color: '#000000' },

            // Punctuation
            punctuation: { color: '#000000' },
            'punctuation.bracket': { color: '#000000' },
            'punctuation.delimiter': { color: '#000000' },
            'punctuation.list_marker': { color: '#000000' },
            'punctuation.special': { color: '#000000' },

            // Prose / Links
            title: { color: '#000000' },
            emphasis: { color: '#000000' },
            'emphasis.strong': { color: '#000000' },
            link_text: { color: '#000000' },
            link_uri: { color: '#000000' },
            predictive: { color: '#000000' },
        },
    },
};

export const monoDark: Theme = {
    name: 'Mono Dark',
    appearance: 'dark',
    style: {
        'editor.background': '#000000',
        'editor.foreground': '#ffffff',
        syntax: {
            // Comments
            comment: { color: '#ffffff' },
            'comment.doc': { color: '#ffffff' },

            // Strings & Literals
            string: { color: '#ffffff' },
            'string.escape': { color: '#ffffff' },
            'string.regex': { color: '#ffffff' },
            'string.special': { color: '#ffffff' },
            'string.special.symbol': { color: '#ffffff' },
            number: { color: '#ffffff' },
            boolean: { color: '#ffffff' },
            constant: { color: '#ffffff' },

            // Keywords & Operators
            keyword: { color: '#ffffff' },
            operator: { color: '#ffffff' },
            preproc: { color: '#ffffff' },

            // Identifiers & Variables
            variable: { color: '#ffffff' },
            'variable.parameter': { color: '#ffffff' },
            'variable.special': { color: '#ffffff' },
            property: { color: '#ffffff' },
            label: { color: '#ffffff' },

            // Functions & Types
            function: { color: '#ffffff' },
            'function.method': { color: '#ffffff' },
            'function.builtin': { color: '#ffffff' },
            constructor: { color: '#ffffff' },
            type: { color: '#ffffff' },
            'type.builtin': { color: '#ffffff' },
            enum: { color: '#ffffff' },
            variant: { color: '#ffffff' },

            // Markup / JSX / HTML
            tag: { color: '#ffffff' },
            attribute: { color: '#ffffff' },
            embedded: { color: '#ffffff' },

            // Punctuation
            punctuation: { color: '#ffffff' },
            'punctuation.bracket': { color: '#ffffff' },
            'punctuation.delimiter': { color: '#ffffff' },
            'punctuation.list_marker': { color: '#ffffff' },
            'punctuation.special': { color: '#ffffff' },

            // Prose / Links
            title: { color: '#ffffff' },
            emphasis: { color: '#ffffff' },
            'emphasis.strong': { color: '#ffffff' },
            link_text: { color: '#ffffff' },
            link_uri: { color: '#ffffff' },
            predictive: { color: '#ffffff' },
        },
    },
};
