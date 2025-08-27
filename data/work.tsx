const projects = [
    {
        name: 'U.S. Tsunami Warning System',
        href: 'https://tsunami-gov.vercel.app',
        date: '2017',
        description: 'Redesigned tsunami.gov with ESRI ArcGIS, Next.js, TypeScript, MongoDB, Vercel, and AWS.',
    },
    {
        name: 'Line Writer',
        href: 'https://linewriter.app',
        date: '2017',
        description: 'Chrome extension that replaces your new tab page with a focused text editor.',
        links: [
            { label: 'linewriter.app', href: 'https://linewriter.app/' },
            {
                label: 'chrome extension',
                href: 'https://chromewebstore.google.com/detail/line-writer/fgfnehceeaiiiimpdlfgnagoggjkdifb',
            },
        ],
    },
    {
        name: 'Juice',
        href: 'https://www.apple.com/watch',
        date: '2022',
        description:
            'React component and Next.js route scaffolding tool. Used to prototype a new Apple Watch buy flow and Today at apple pages.',
    },
    // {
    //     name: 'Robi',
    //     href: 'https://robijs.dev',
    //     date: '2017',
    //     description: 'SharePoint single-page application framework for client-side development.',
    // },
];

export default projects;
