import { readFile, writeFile } from 'fs/promises'

let license = [
    '<!--',
    `Copyright ${new Date().getFullYear()} Stephen Matheis`,
    '',
    'Permission to use, copy, modify, and/or distribute this software for any',
    'purpose with or without fee is hereby granted, provided that the above',
    'copyright notice and this permission notice appear in all copies.' ,
    '',
    'THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES',
    'WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF',
    'MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY',
    'SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER',
    'RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF',
    'CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN',
    'CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.',
    '-->',
    ''
];

let index = [
    `<!DOCTYPE html>`,
    `<html lang="en">`,
    `<head>`,
    `    <meta charset="UTF-8">`,
    `    <meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    `    <title>Stephen Matheis</title>`,
    `    <link rel="apple-touch-icon" sizes="180x180" href="favicons/light/apple-touch-icon.png">`,
    `    <link rel="icon" type="image/png" sizes="32x32" href="favicons/light/favicon-32x32.png">`,
    `    <link rel="icon" type="image/png" sizes="16x16" href="favicons/light/favicon-16x16.png">`,
    `    <link rel="preload" as="image" href="images/comptia-security-ce-certification-144x144.png">`,
    `    <link rel="stylesheet" href="style.css">`,
    `</head>`,
    `<body>`,
    `    <!-- Header -->`,
    `    <header>`,
    `        <div id="profile" class="container flex align-center justify-between">`,
    `            <div>`,
    `                <a href="https://www.stephenmatheis.com">`,
    `                    <h1 class="name">Stephen Matheis</h1>`,
    `                </a>`,
    `                <h4 class="title">Software Developer</h4>`,
    `            </div>`,
    `            <div class="links">`,
    `                <a href="https://github.com/stephenmatheis" target="_blank" title='GitHub'>`,
    `                    <svg class="icon icon-github">`,
    `                        <use xlink:href="#icon-github"></use>`,
    `                    </svg>`,
    `                </a>`,
    `                <a href="https://www.linkedin.com/in/stephenmatheis/" target="_blank" title='LinkedIn'>`,
    `                    <svg class="icon icon-linkedin">`,
    `                        <use xlink:href="#icon-linkedin"></use>`,
    `                    </svg>`,
    `                </a>`,
    `            </div>`,
    `        </div>`,
    `    </header>`,
    `    <!-- Main -->`,
    `    <main>`,
    `        <section class="left">`,
    `            <div id="experience" class="container">`,
    `                <h2>Experience</h2>`
];

// Jobs
const jobsRes = await readFile('jobs.json');
const jobs = JSON.parse(jobsRes);

jobs.forEach(job => {
    const {
        title,
        company,
        location,
        start,
        end,
        lines
    } = job;

    index= index.concat([
        `                <div class="job">`,
        `                    <div class="job-heading title">${title ? `${title} at` : ''} ${company ? `${company} in` : ''} ${location}</div>`,
        `                    <div class="job-heading date">${start}<span style='padding: 0px 5px;'>➜</span>${end}</div>`,
        `                <div>`,
        `                    <ul>`
    ]);

    lines.forEach(line => {
        index = index.concat([
            `                        <li>${line}</li>`
        ]);
    });

    index = index.concat([
        `                    </ul>`,
        `                        </div>`,
        `                    </div>`
    ]);
});

index = index.concat([
    `            </div>`,
    `        </section>`,
    `        <section class="right">`,
    `            <div id="skills" class="container">`,
    `                <h2>Skills</h2>`
]);

// Skills
const skillsRes = await readFile('skills.json');
const skills = JSON.parse(skillsRes);

const curentYear = new Date().getFullYear();
const max = Math.max(...skills.map(skill => parseInt(curentYear - skill.started)));

skills.forEach(skill => {
    const {
        name,
        started
    } = skill;

    const years = curentYear - started || 1;
    const width = Math.round((parseInt(years) / max) * 100);

    index = index.concat([
        `                <div class="skill">`,
        `                    <div class='name-years'>`,
        `                        <span class="name">${name}</span>`,
        `                        <span class="years">${years} ${parseInt(years) === 1 ? 'year' : 'years'}</span>`,
        `                    </div>`,
        `                    <div class="skill-bar" style="width: ${width}%"></div>`,
        `                </div>`
    ]);
});

index = index.concat([
    `            </div>`,
    `            <div id="certs" class="container">`,
    `                <h2 class='mb-0'>Certifications</h2>`,
    `                <div class="cert">`,
    `                    <div class='flex align-center justify-between'>`,
    `                        <div class="cert-name">CompTIA Security+</div>`,
    `                        <a href="https://www.credly.com/badges/3e13de8d-cda2-4472-a29a-588339f5cbc3" target="_blank">`,
    `                            <img src='images/comptia-security-ce-certification-144x144.png' class='cert-badge' title='CompTIA Security+'>`,
    `                        </a>`,
    `                    </div>`,
    `                    <div class="cert-date">`,
    `                        <span class='bold'>Issued</span>`,
    `                        <span class="date">April 20, 2018</span>`,
    `                    </div>`,
    `                    <div class="cert-date">`,
    `                        <span class='bold'>Expires</span>`,
    `                        <span class="date">April 20, 2024</span>`,
    `                    </div>`,
    `                </div>`,
    `            </div>`,
    `            <div id="education" class="container">`,
    `                <h2>Education</h2>`,
    `                <div class="education college">`,
    `                    <a href="https://www.georgiasouthern.edu/campuses/armstrong-campus/" target="_blank">Armstrong`,
    `                        Atlantic State University`,
    `                    </a>`,
    `                </div>`,
    `                <div class="education major">Computer Science</div>`,
    `                <div class="education date">2006 - 2007</div>`,
    `            </div>`,
    `            <div id="contacts" class="container">`,
    `                <h2 class=>Contact</h2>`,
    `                <div class="contact email">`,
    `                    <div class="contact title">Email</div>`,
    `                    <a href="mailto:stephen.a.matheis@gmail.com">stephen.a.matheis@gmail.com</a>`,
    `                </div>`,
    `                <div class="contact phone">`,
    `                    <div class="contact title">Phone</div>`,
    `                    <a href="tel:9124922522">(912) 492-2522</a>`,
    `                </div>`,
    `            </div>`,
    `        </section>`,
    `    </main>`,
    `    <!-- Footer -->`,
    `    <footer>`,
    `        <!-- Toggle Light/Dark Mode -->`,
    `        <div class="mode">`,
    `            <label style='display: none;' title='Hidden checkbox to toggle dark/light mode' for="toggle"></label>`,
    `            <input id="toggle" class="toggle" type="checkbox">`,
    `        </div>`,
    `        <!-- View source on GH -->`,
    `        <a href="https://github.com/stephenmatheis/stephenmatheis.com" target="_blank">See how this site was made</a>`,
    `    </footer>`,
    `    <!-- SVG Icons | https://icomoon.io/app -->`,
    `    <svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1"`,
    `        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`,
    `        <defs>`,
    `            <symbol id="icon-github" viewBox="0 0 32 32">`,
    `                <path`,
    `                    d="M16 0.395c-8.836 0-16 7.163-16 16 0 7.069 4.585 13.067 10.942 15.182 0.8 0.148 1.094-0.347 1.094-0.77 0-0.381-0.015-1.642-0.022-2.979-4.452 0.968-5.391-1.888-5.391-1.888-0.728-1.849-1.776-2.341-1.776-2.341-1.452-0.993 0.11-0.973 0.11-0.973 1.606 0.113 2.452 1.649 2.452 1.649 1.427 2.446 3.743 1.739 4.656 1.33 0.143-1.034 0.558-1.74 1.016-2.14-3.554-0.404-7.29-1.777-7.29-7.907 0-1.747 0.625-3.174 1.649-4.295-0.166-0.403-0.714-2.030 0.155-4.234 0 0 1.344-0.43 4.401 1.64 1.276-0.355 2.645-0.532 4.005-0.539 1.359 0.006 2.729 0.184 4.008 0.539 3.054-2.070 4.395-1.64 4.395-1.64 0.871 2.204 0.323 3.831 0.157 4.234 1.026 1.12 1.647 2.548 1.647 4.295 0 6.145-3.743 7.498-7.306 7.895 0.574 0.497 1.085 1.47 1.085 2.963 0 2.141-0.019 3.864-0.019 4.391 0 0.426 0.288 0.925 1.099 0.768 6.354-2.118 10.933-8.113 10.933-15.18 0-8.837-7.164-16-16-16z">`,
    `                </path>`,
    `            </symbol>`,
    `            <symbol id="icon-linkedin" viewBox="0 0 32 32">`,
    `                <path`,
    `                    d="M29 0h-26c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h26c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3zM12 26h-4v-14h4v14zM10 10c-1.106 0-2-0.894-2-2s0.894-2 2-2c1.106 0 2 0.894 2 2s-0.894 2-2 2zM26 26h-4v-8c0-1.106-0.894-2-2-2s-2 0.894-2 2v8h-4v-14h4v2.481c0.825-1.131 2.087-2.481 3.5-2.481 2.488 0 4.5 2.238 4.5 5v9z">`,
    `                </path>`,
    `            </symbol>`,
    `        </defs>`,
    `    </svg>`,
    `    <!-- JS -->`,
    `    <script src="main.js"></script>`,
    `</body>`,
    `</html>`
]);

index = license.concat(index);

// Write to index.html
await writeFile(`index.html`, index.join('\n'));