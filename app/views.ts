/**
 * The different ways of browsing the archive.
 *
 * Each view is its own route, so every one has a URL you can share, and the
 * back button works the way you'd expect. The switcher in the corner reads
 * this list, so adding a view means adding a route folder and a line here.
 *
 * Views are grouped by flavor so the switcher's menu stays scannable. The
 * order here is also the order `[` and `]` step through them.
 */
export type ViewGroup = 'browse' | 'retro' | 'computer' | 'games';

export type View = {
    path: string;

    /** Short, lowercase, terminal-ish. Shown in the switcher. */
    name: string;

    /** One line, used as the page description and the switcher's tooltip. */
    description: string;

    group: ViewGroup;
};

/** Menu headings, in the order the groups appear. */
export const viewGroups: { id: ViewGroup; label: string }[] = [
    {
        id: 'browse',
        label: 'browse',
    },
    {
        id: 'retro',
        label: 'retro',
    },
    {
        id: 'computer',
        label: 'computer',
    },
    {
        id: 'games',
        label: 'games',
    },
];

export const views: View[] = [
    // Browse: ways of looking at the history itself.
    {
        path: '/',
        name: 'graph',
        description: 'Every version as a branch in git log --graph.',
        group: 'browse',
    },
    {
        path: '/log',
        name: 'log',
        description: 'Release notes for every version.',
        group: 'browse',
    },
    {
        path: '/scrub',
        name: 'scrub',
        description: 'Drag through time and watch the site change.',
        group: 'browse',
    },
    {
        path: '/onion',
        name: 'onion',
        description: 'Every version stacked on top of each other.',
        group: 'browse',
    },
    {
        path: '/diff',
        name: 'diff',
        description: 'Compare two versions the way GitHub compares images.',
        group: 'browse',
    },
    {
        path: '/mosaic',
        name: 'mosaic',
        description: 'One version rebuilt out of tiny tiles of all the others.',
        group: 'browse',
    },
    {
        path: '/contributions',
        name: 'contributions',
        description: 'Every day of work, as a contribution graph.',
        group: 'browse',
    },
    {
        path: '/subway',
        name: 'subway',
        description: 'The history as a subway map, one line per framework.',
        group: 'browse',
    },

    // Retro: old hardware.
    {
        path: '/tv',
        name: 'tv',
        description: 'Flip through the versions like TV channels.',
        group: 'retro',
    },
    {
        path: '/cams',
        name: 'cams',
        description: 'A wall of security camera feeds, one per version.',
        group: 'retro',
    },
    {
        path: '/slides',
        name: 'slides',
        description: 'A slide projector, clunk by clunk.',
        group: 'retro',
    },
    {
        path: '/viewmaster',
        name: 'viewmaster',
        description: 'Six View-Master reels, seven versions each.',
        group: 'retro',
    },
    {
        path: '/radio',
        name: 'radio',
        description: 'Tune the dial until a version comes in.',
        group: 'retro',
    },
    {
        path: '/phone',
        name: 'phone',
        description: 'Dial a version on a rotary phone.',
        group: 'retro',
    },
    {
        path: '/vending',
        name: 'vending',
        description: 'Punch in a code and a version drops out.',
        group: 'retro',
    },
    {
        path: '/delorean',
        name: 'delorean',
        description: 'Set the time circuits and hit 88 mph.',
        group: 'retro',
    },

    // Computer: screens, shells, and operating systems.
    {
        path: '/tabs',
        name: 'tabs',
        description: 'A browser with 42 tabs open, all of them this site.',
        group: 'computer',
    },
    {
        path: '/desktop',
        name: 'desktop',
        description: 'A retro desktop with a file for every version.',
        group: 'computer',
    },
    {
        path: '/boot',
        name: 'boot',
        description: 'Pick a version to boot from the GRUB menu.',
        group: 'computer',
    },
    {
        path: '/htop',
        name: 'htop',
        description: 'Every version as a running process.',
        group: 'computer',
    },
    {
        path: '/telescope',
        name: 'telescope',
        description: 'Fuzzy-find a version, Neovim style.',
        group: 'computer',
    },
    {
        path: '/ssh',
        name: 'ssh',
        description: 'Browse the archive from a terminal.',
        group: 'computer',
    },
    {
        path: '/matrix',
        name: 'matrix',
        description: 'Catch a version in the digital rain.',
        group: 'computer',
    },

    // Games.
    {
        path: '/roulette',
        name: 'roulette',
        description: 'Spin for a random version.',
        group: 'games',
    },
    {
        path: '/bisect',
        name: 'bisect',
        description: 'git bisect your way to where it all went wrong.',
        group: 'games',
    },
    {
        path: '/plinko',
        name: 'plinko',
        description: 'Drop a ball and see where it lands.',
        group: 'games',
    },
    {
        path: '/piano',
        name: 'piano',
        description: 'Forty-two keys, one version each.',
        group: 'games',
    },
    {
        path: '/adventure',
        name: 'adventure',
        description: 'A text adventure where the rooms are years.',
        group: 'games',
    },
];
