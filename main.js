// Jobs
const jobs = [
    {
        title: 'Subject Matter Expert II',
        company: 'Aeyon',
        location: 'San Antonio, TX',
        start: 'May 2021',
        end: 'Present',
        lines: [
            'Develop a cross-platform mobile application for the United States Marine Corps (USMC) Defense Agencies Initiative (DAI) with Expo, Firebase, and React Native',
            'Develop a web application for the United States Marine Corps (USMC) Defense Agencies Initiative (DAI) with React and Firebase',
            'Building client-side SharePoint applications for the Defense Health Agency (DHA) with HTML, CSS, JS, and the 2013 REST API',
        ]
    },
    {
        title: 'SharePoint Developer',
        company: 'T and T Consulting Services',
        location: 'San Antonio, TX',
        start: 'March 2018',
        end: 'May 2021',
        lines: [
            'Technical Lead to a team of 3 developers and 2 administrators',
            'Built client-side SharePoint applications for Army Medical Command (MEDCOM) Regional Health Command - Central (RHC-C) G-6 Information Management Division (IMD) with HTML, CSS, JS, and the 2010 and 2013 REST API',
            'Led migration from SharePoint 2010 to 2013'
        ]
    },
    {
        title: '',
        company: '',
        location: 'Washington, D.C.',
        start: 'October 2017',
        end: 'May 2021',
        lines: [
            `Started <a href='https://github.com/stephenmatheis/robi-starter' target='_blank' data-text='Robi'>Robi</a>, a JavaScript single page application framework`
        ]
    },
    {
        title: 'SharePoint Developer',
        company: 'HID Global',
        location: 'Austin, TX',
        start: 'September 2016',
        end: 'October 2017',
        lines: [
            'Built client-side SharePoint applications with HTML, CSS, JS, and the 2013 REST API',
            'Migrated from SharePoint 2010 to 2013',
            'Migrated Lotus Notes wikis, data, and applications to SharePoint 2010'
        ]
    },
    {
        title: 'System Administrator',
        company: 'Tech 2000',
        location: 'Herndon, VA',
        start: 'March 2016',
        end: 'August 2016',
        lines: [
            'Wrote bash and AppleScript tools',
            'Supported Mac and iPhone end-user devices',
            'Maintained Apple and Cisco certified training labs and equipment'
        ]
    },
    {
        title: 'Senior Consultant',
        company: 'Bravo Consulting Group',
        location: 'Reston, VA',
        start: 'November 2014',
        end: 'May 2016',
        lines: [
            'Built client-side applications for the Department of Veteran\'s Affairs (VA), the White House Communications Agency (WHCA), and the Executive Office of the President (EOP) with HTML, CSS, JS, and the 2010 and 2013 REST API',
            'Wrote PowerShell tools to generate automated reports and archive list data as XML',
            'Migrated from SharePoint 2010 to 2013'
        ]
    },
    {
        title: 'Access Control Specialist',
        company: 'Applied Integrated Technologies',
        location: 'Charlottesville, VA',
        start: 'February 2011',
        end: 'November 2014',
        lines: [
            'SharePoint site administration',
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
        start,
        end,
        lines
    } = job;

    // <div class="job-heading title">${title ? `${title} •` : ''} ${company ? `${company} •` : ''} ${location}</div>
    let html = /*html*/`
        <div class="job">
            <div class="job-heading title">${title ? `${title} at` : ''} ${company ? `${company} in` : ''} ${location}</div>
            <div class="job-heading date">${start}<span style='padding: 0px 5px;'>➜</span>${end}</div>
        <div>
            <ul>
    `;

    lines.forEach(bullet => {
        html += /*html*/ `
            <li>${bullet}.</li>
        `;
    });

    html += /*html*/ `
                </ul>
            </div>
        </div>
    `;

    experience.insertAdjacentHTML('beforeend', html);
});

// Skills
const skills = [
    {
        name: 'HTML',
        years: '18',
        started: 2002
    },
    {
        name: 'CSS',
        years: '18',
        started: 2002
    },
    {
        name: 'JavaScript',
        years: '18',
        started: 2002
    },
    {
        name: 'SharePoint',
        years: '18',
        started: 2002
    },
    {
        name: 'Unix/Linux Shell',
        years: '14',
        started: 2002
    },
    {
        name: 'PowerShell',
        years: '7',
        started: 2002
    },
    {
        name: 'Python',
        years: '3',
        started: 2018
    },
    {
        name: 'React, React Native',
        years: '1',
        started: 2021
    },
    {
        name: 'Mobile App Development',
        years: '1',
        started: 2021
    }
];

const skillsNode = document.querySelector('#skills');
const max = Math.max(...skills.map(skill => parseInt(skill.years)));

skills.forEach(skill => {
    const {
        name,
        started
    } = skill;

    const curentYear = new Date().getFullYear();
    const years = curentYear - started || 1;

    // console.log(curentYear, '-', started, '=', years);
    
    const width = Math.round((parseInt(years) / max) * 100);

    let html = /*html*/`
        <div class="skill">
            <div class='name-years'>
                <span class="name">${name}</span>
                <span class="years">${years} ${parseInt(years) === 1 ? 'year' : 'years'}</span>
            </div>
            <div class="skill-bar" style="width: ${width}%"></div>
        </div>
    `;

    skillsNode.insertAdjacentHTML('beforeend', html);
});

// Toggle theme
const toggle = document.querySelector('#toggle');

// Detect user preference
if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        toggleMode('light');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleMode('dark');
    }
} else {
    toggleMode('light');
}

// Add theme override event listener
toggle.addEventListener('change', event => {
    const state = event.target.checked;
    
    if (state) {
        setMode('dark');
    } else {
        setMode('light')
    }
});

// Automatically toggle light/dark mode based on local time of day - https://codepen.io/mrozilla/pen/OJJNjRb
const hours = new Date().getHours();

if (hours < 7 || hours > 19) {
    toggleMode('dark');
}

function toggleMode(mode) {
    toggle.checked = mode === 'light' ? false : true;
    setMode(mode);
}

function setMode(mode) {
    document.querySelector('html').dataset.theme = mode;
    document.querySelector("link[rel='apple-touch-icon']").href = `favicons/${mode}/apple-touch-icon.png`;
    document.querySelector("link[rel='icon'][sizes='32x32']").href = `favicons/${mode}/favicon-32x32.png`;
    document.querySelector("link[rel='icon'][sizes='16x16']").href = `favicons/${mode}/favicon-16x16.png`;
}
