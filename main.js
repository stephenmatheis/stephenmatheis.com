/** Jobs */
const jobs = [
    {
        title: 'SharePoint Developer',
        company: 'Sehlke Consulting',
        location: 'San Antonio, TX',
        dates: 'May 2021 - Present',
        bullets: [
            'Develop and maintain a cross-platform mobile application for the United States Marine Corps (USMC) Defense Agencies Initiative (DAI) with Expo, Firebase, and React Native',
            'Develop and maintain a web application for the United States Marine Corps (USMC) Defense Agencies Initiative (DAI) with React and Firebase',
            'Building client-side SharePoint applications for the Defense Health Agency (DHA) with HTML, CSS, JS, and the 2013 REST API',
        ]
    },
    {
        title: 'SharePoint Developer',
        company: 'T and T Consulting Services',
        location: 'San Antonio, TX',
        dates: 'March 2018 - May 2021',
        bullets: [
            'Technical Lead to a team of 3 developers and 2 administrators',
            'Built client-side SharePoint applications for Army Medical Command (MEDCOM) <span style="white-space: nowrap;">Regional Health Command - Central (RHC-C)</span> G-6 Information Management Division (IMD) with HTML, CSS, JS, and the 2010 and 2013 REST API',
            'Led migration from SharePoint 2010 to 2013'
        ]
    },
    {
        title: '',
        company: 'Self-Employed',
        location: 'Washington, D.C.',
        dates: 'October 2017 - March 2018',
        bullets: [
            'Prototyped a JavaScript single page application framework'
        ]
    },
    {
        title: 'SharePoint Developer',
        company: 'HID Global',
        location: 'Austin, TX',
        dates: 'September 2016 - October 2017',
        bullets: [
            'Built client-side SharePoint applications with HTML, CSS, JS, and the 2013 REST API',
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
            'Wrote bash and AppleScript tools',
            'Supported Mac and iPhone end-user devices',
            'Maintained Apple and Cisco certified training labs and equipment'
        ]
    },
    {
        title: 'Senior Consultant',
        company: 'Bravo Consulting Group',
        location: 'Reston, VA',
        dates: 'November 2014 - May 2016',
        bullets: [
            'Built client-side applications for the Department of Veteran\'s Affairs (VA), the White House Communications Agency (WHCA), and the Executive Office of the President (EOP) with HTML, CSS, JS, and the 2010 and 2013 REST API',
            'Wrote PowerShell tools to generate automated reports and archive list data as XML',
            'Migrated from SharePoint 2010 to 2013'
        ]
    },
    {
        title: 'Access Control Specialist',
        company: 'Applied Integrated Technologies',
        location: 'Charlottesville, VA',
        dates: 'February 2011 - November 2014',
        bullets: [
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
        dates,
        bullets
    } = job;

    // let html = /*html*/`
    //     <div class="job">
    //         <div class="job-heading title">${title ? `${title} •`: ''} ${company}, ${location}</div>
    //         <div class="job-heading date">${dates}</div>
    //         <ul>
    // `;

    // bullets.forEach(bullet => {
    //     html += /*html*/ `
    //         <li>${bullet}</li>
    //     `;
    // });

    // html += /*html*/ `
    //         </ul>
    //     </div>
    // `;

    let html = /*html*/`
        <div class="job">
            <div class="job-heading title">${title ? `${title} •`: ''} ${company}, ${location}</div>
            <div class="job-heading date">${dates}</div>
            <div>
    `;

    bullets.forEach(bullet => {
        html += /*html*/ `
            <p style="margin: 3px 0px;">${bullet}.</p>
        `;
    });

    html += /*html*/ `
            </div>
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
        name: 'JavaScript',
        years: '18'
    },
    {
        name: 'SharePoint',
        years: '18'
    },
    {
        name: 'Unix/Linux Shell',
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
    {
        name: 'React, React Native',
        years: '1'
    },
    {
        name: 'Mobile App Development',
        years: '1'
    }
];

const skillsNode = document.querySelector('#skills');
const max = Math.max(...skills.map(skill => parseInt(skill.years)));

skills.forEach(skill => {
    const {
        name,
        prefix,
        years
    } = skill;
    
    const width = Math.round((parseInt(years) / max) * 100);

    let html = /*html*/`
        <div class="skill">
            <div class='name-years'>
                <span class="name">${name}</span>
                <span class="years">${prefix || ''}${years} ${parseInt(years) === 1 ? 'year' : 'years'}</span>
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
