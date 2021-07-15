/** Jobs */
const jobs = [
    {
        title: 'SharePoint Developer',
        company: 'Sehlke Consulting',
        location: 'San Antonio, TX',
        dates: 'May 2021 - Present',
        bullets: [
            'Supporting the Defense Health Agency (DHA) <span style="white-space: nowrap;">J-5</span> Analytics and Evaluation Divsion (AED) Knowledge Management (KM) Branch',
            'Creating client-side SharePoint applications with HTML, CSS, JS, and the 2013 REST API',
        ]
    },
    {
        title: 'SharePoint Developer',
        company: 'T and T Consulting Services',
        location: 'San Antonio, TX',
        dates: 'March 2018 - May 2021',
        bullets: [
            'Supported Army Medical Command (MEDCOM) Regional Health Command - Central (RHC-C) G-6 Information Managment Division (IMD)',
            'Lead a team of 3 developers and 2 administrators',
            'Created client-side SharePoint applications with HTML, CSS, JS, and the 2010 and 2013 REST API',
            'Assisted with migrating an on premise SharePoint 2013 environment to Amazon Web Services (AWS)',
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
            'Prototyped a Single Page Application (SPA) development framework in JS'
        ]
    },
    {
        title: 'SharePoint Developer',
        company: 'HID Global',
        location: 'Austin, TX',
        dates: 'September 2016 - October 2017',
        bullets: [
            'Created client-side SharePoint applications with HTML, CSS, JS, and the 2013 REST API',
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
            'Supported the Department of Veteran\'s Affairs (VA), the White House Communications Agency (WHCA), and the Executive Office of the President (EOP)',
            'Created client-side dashboards and applications with HTML, CSS, JS, and the 2010 and 2013 REST API',
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
            <div class="job-heading date">${dates}</div>
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
        name: 'JavaScript (JS)',
        years: '18'
    },
    {
        name: 'SharePoint',
        years: '18'
    },
    {
        name: 'UNIX/Linux Shell',
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
            <div class='name-years'>
                <span class="name">${name}</span>
                <span class="years">${years} years</span>
            </div>
            <div class="skill-bar" style="width: ${width}%"></div>
        </div>
    `;

    skillsNode.insertAdjacentHTML('beforeend', html);
});

/** Time */
const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

const formattedTime = new Date().toLocaleTimeString('en-US', {
    timeStyle: 'short'
});

document.querySelector('#time').innerText = `${formattedDate} ${formattedTime}`

/** Toggle Dark Mode */
/** @todo I'm pretty sure this can all be done with just css */
const toggle = document.querySelector('#toggle');

toggle.addEventListener('change', event => {
    const state = event.target.checked;

    if (state) {
        setMode('dark');
    } else {
        setMode('light')
    }
});

function setMode(mode) {
    if (mode === 'dark') {
        setDark();
    } else if (mode === 'light') {
        setLight();
    }

    setFavicon(mode);
}

function setDark() {
    document.querySelector('html').classList.add('dark-mode');
    document.querySelector('header img').src = 'images/dark_128x128.png';
}

function setLight() {
    document.querySelector('html').classList.remove('dark-mode');
    document.querySelector('header img').src = 'images/light_128x128.jpg';
}

function setFavicon(mode) {
    document.querySelector("link[rel='apple-touch-icon']").href = `favicons/${mode}/apple-touch-icon.png`;
    document.querySelector("link[rel='icon'][sizes='32x32']").href = `favicons/${mode}/favicon-32x32.png`;
    document.querySelector("link[rel='icon'][sizes='16x16']").href = `favicons/${mode}/favicon-16x16.png`;
}

/**
 * Automatically toggle light/dark mode based on local time of day
 * {@link https://codepen.io/mrozilla/pen/OJJNjRb}
 */
const hours = new Date().getHours();

if (hours < 7 || hours > 19) {
    toggle.checked = true;

    setMode('dark');
}
