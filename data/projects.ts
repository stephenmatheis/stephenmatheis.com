const projects = [
    {
        name: 'U.S. Tsunami Warning System',
        date: '2017',
        link: 'https://tsunami-gov.vercel.app/',
        description: /*html*/ `
            Redesigned <a href="https://tsunami.gov/" target="_blank">tsunami.gov</a> with 
            Next.js, TypeScript, and MongoDB. Hosted on AWS.
        `,
    },
    {
        name: 'Line Writer',
        date: '2017',
        link: 'https://linewriter.app/',
        description: /*html*/ `
            A Chrome extension to replace your new tab page with a focused place to write. 
        `,
    },

    {
        name: 'Apple',
        date: '2022',
        link: 'https://www.apple.com/watch/',
        description: /*html*/ `Prototyped a new <a href="https://apple.com/watch" target="_blank">apple.com/watch</a> buy flow. 
        Worked with design and production engineering teams to dial things in.`,
    },
    {
        name: 'Robi',
        date: '2017',
        link: 'https://robijs.dev',
        description: /*html*/ `
            A SharePoint SPA framework. 
            Originally created without NPM since every line of code I wrote had to be done on a air gapped machine.
        `,
    },
];

export default projects;
