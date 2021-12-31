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

// Toggle theme based on local time of day - https://codepen.io/mrozilla/pen/OJJNjRb
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

// Jobs
const jobs = [
    {
        title: 'Subject Matter Expert II',
        company: 'Aeyon',
        location: 'San Antonio, TX',
        start: 'May 2021',
        end: 'Present',
        lines: [
            'Developing a cross-platform mobile application for the United States Marine Corps (USMC) Defense Agencies Initiative (DAI) with <a href="https://expo.dev/" target="_blank">Expo</a>, <a href="https://firebase.google.com/" target="_blank">Firebase</a>, and <a href="https://reactnative.dev/" target="_blank">React Native</a>',
            'Developing a web application for the United States Marine Corps (USMC) Defense Agencies Initiative (DAI) with React and Firebase',
            'Building client-side SharePoint applications for the Defense Health Agency (DHA) with <a href="https://github.com/stephenmatheis/robi-starter" target="_blank">Robi</a> and the <a href="https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service?tabs=http" target="_blank">SharePoint 2013 REST API</a>',
        ]
    },
    {
        title: 'SharePoint Developer',
        company: 'T and T Consulting Services',
        location: 'San Antonio, TX',
        start: 'March 2018',
        end: 'May 2021',
        lines: [
            'Technical Lead to 3 developers and 2 administrators',
            'Client-side application development and farm administration for Army Medical Command (MEDCOM) Regional Health Command - Central (RHC-C) G-6 Information Management Division (IMD)',
            'Responisble for a growing catalogue of 33+ custom-built in-house applications',
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
            'Client-side application development and farm administration',
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
            'Maintained Apple and Cisco certified training lab equipment'
        ]
    },
    {
        title: 'Senior Consultant',
        company: 'Bravo Consulting Group',
        location: 'Reston, VA',
        start: 'November 2014',
        end: 'May 2016',
        lines: [
            'Client-side application development and farm administration for the Department of Veteran\'s Affairs (VA), the White House Communications Agency (WHCA), and the Executive Office of the President (EOP)',
            'Wrote PowerShell tools to generate reports and archive list data as XML',
            'Assisted in migrating Air National Guard (ANG) from SharePoint 2010 to 2013'
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
            'Automated key performance indicator (KPI) data collection and analysis with Excel, VBA, and SharePoint 2007'
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

    let html = /*html*/`
        <div class="job">
            <div class="job-heading title">${title ? `${title} at` : ''} ${company ? `${company} in` : ''} ${location}</div>
            <div class="job-heading date">${start}<span style='padding: 0px 5px;'>➜</span>${end}</div>
        <div>
            <ul>
    `;

    lines.forEach(line => {
        html += /*html*/ `
            <li>${line}</li>
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
        started: 2002
    },
    {
        name: 'CSS',
        started: 2002
    },
    {
        name: 'JavaScript',
        started: 2002
    },
    {
        name: 'SharePoint',
        started: 2002
    },
    {
        name: 'Unix/Linux Shell',
        started: 2006
    },
    {
        name: 'PowerShell',
        started: 2014
    },
    {
        name: 'Git/GitHub',
        started: 2015
    },
    {
        name: 'Python',
        started: 2018
    },
    {
        name: 'React, React Native',
        started: 2021
    },
    {
        name: 'Mobile App Development',
        started: 2021
    }
];

const curentYear = new Date().getFullYear();
const skillsNode = document.querySelector('#skills');
const max = Math.max(...skills.map(skill => parseInt(curentYear - skill.started)));

skills.forEach(skill => {
    const {
        name,
        started
    } = skill;

    const years = curentYear - started || 1;
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

/* Show body */
document.body.style.opacity = '1';

// /* Animate */
// document.querySelector('header').classList.add('slide-down');

// if (window.innerWidth > 1200) {
//     document.querySelector('.left').classList.add('slide-in-right');
//     document.querySelector('.right').classList.add('slide-in-left');
// } else {
//     document.querySelector('main').classList.add('slide-up');
// }
