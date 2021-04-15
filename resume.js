/** Jobs */
const jobs = [
    {
        title: 'SharePoint Developer',
        company: 'T and T Consulting Services',
        location: 'San Antonio, TX',
        dates: 'March 2018 - Present',
        bullets: [
            'Leads a team of 3 developers and 2 administrators',
            'Creating client-side SharePoint applications with HTML, CSS, JS, and the SharePoint 2013 REST API',
            'Migrating from an on premise environment to Amazon Web Services (AWS)',
            'Led migration from SharePoint 2010 to 2013'
        ]
    },
    {
        title: 'Software Developer',
        company: 'Self-Employed',
        location: 'Washington, D.C.',
        dates: 'October 2017 - March 2018',
        bullets: [
            'Web development',
            'Prototyped Single Page Application (SPA) application framework in JS'
        ]
    },
    {
        title: 'SharePoint Developer',
        company: 'HID Global',
        location: 'Austin, TX',
        dates: 'September 2016 - October 2017',
        bullets: [
            'Created client-side SharePoint applications with HTML, CSS, JS, and the SharePoint 2013 REST API',
            'Migrated from SharePoint 2010 to 2013',
            'Migrated Lotus Notes wikis, data, and applications to SharePoint 2010'
        ]
    },
    {
        title: 'System Administrator',
        company: 'Tech 2000',
        location: 'Herndon, VA',
        dates: 'March 2016 - August 2016',
        bullets: [
            'Maintained Apple and Cisco certified training labs and equipment',
            'Used in-house 4D RDBMS tools to manage students, courses, and equipment',
            'Apple computer and mobile device management and support'
        ]
    },
    {
        title: 'Senior Consultant',
        company: 'Bravo Consulting Group',
        location: 'Reston, VA',
        dates: 'November 2014 - May 2016',
        bullets: [
            'Created client-side dashboards and applications with HTML, CSS, JS, and the SharePoint 2010 REST API',
            'Created PowerShell tools to generate automated reports and archive list data as XML',
            'Assisted in SharePoint 2010 to 2013 migrations for DoD and Federal agencies'
        ]
    },
    {
        title: 'Access Control Specialist',
        company: 'Applied Integrated Technologies',
        location: 'Charlottesville, VA',
        dates: 'February 2011 - November 2014',
        bullets: [
            'Assisted SharePoint site administrator',
            'Automated data collection and analysis with Excel and SharePoint 2007'
        ]
    }
];

const experience = document.querySelector('#experience');

jobs.forEach(job => {
    const {
        title,
        company,
        location,
        dates,
        bullets
    } = job;

    let html = /*html*/`
        <div class="job">
            <div class="job-heading title">${title}, ${company}, ${location}</div>
            <div class="job-heading dates">${dates}</div>
            <ul>
    `;

    bullets.forEach(bullet => {
        html += /*html*/ `
            <li>${bullet}</li>
        `;
    });

    html += /*html*/ `
            </ul>
        </div>
    `;

    experience.insertAdjacentHTML('beforeend', html);
});

/** Skills */
const skills = [
    {
        name: 'HTML',
        years: '18'
    },
    {
        name: 'CSS',
        years: '18'
    },
    {
        name: 'JS',
        years: '18'
    },
    {
        name: 'SharePoint',
        years: '18'
    },
    {
        name: 'UNIX/Linux',
        years: '14'
    },
    {
        name: 'PowerShell',
        years: '7'
    },
    {
        name: 'Python',
        years: '3'
    },
];

const skillsNode = document.querySelector('#skills');
const max = Math.max(...skills.map(skill => parseInt(skill.years)));

skills.forEach(skill => {
    const {
        name,
        years
    } = skill;
    
    const width = Math.round((parseInt(years) / max) * 100);

    let html = /*html*/`
        <div class="skill">
            <div class="skill-bar" style="width: ${width}%"></div>
            <div class='name-years'>
                <span class="name">${name}</span>
                <span class="years">${years} years</span>
            </div>
        </div>
    `;

    skillsNode.insertAdjacentHTML('beforeend', html);
});
