/**
 * The different ways of browsing the archive.
 *
 * Each view is its own route, so every one has a URL you can share, and the
 * back button works the way you'd expect. The switcher in the corner reads
 * this list, so adding a view means adding a route folder and a line here.
 */
export type View = {
    path: string;

    /** Short, lowercase, terminal-ish. Shown in the switcher. */
    name: string;

    /** One line, used as the page description and the switcher's tooltip. */
    description: string;
};

export const views: View[] = [
    {
        path: '/',
        name: 'graph',
        description: 'Every version as a branch in git log --graph.',
    },
    {
        path: '/tv',
        name: 'tv',
        description: 'Flip through the versions like TV channels.',
    },
    {
        path: '/scrub',
        name: 'scrub',
        description: 'Drag through time and watch the site change.',
    },
    {
        path: '/onion',
        name: 'onion',
        description: 'Every version stacked on top of each other.',
    },
    {
        path: '/cams',
        name: 'cams',
        description: 'A wall of security camera feeds, one per version.',
    },
    {
        path: '/tabs',
        name: 'tabs',
        description: 'A browser with 42 tabs open, all of them this site.',
    },
    {
        path: '/roulette',
        name: 'roulette',
        description: 'Spin for a random version.',
    },
    {
        path: '/ssh',
        name: 'ssh',
        description: 'Browse the archive from a terminal.',
    },
    {
        path: '/log',
        name: 'log',
        description: 'Release notes for every version.',
    },
];
