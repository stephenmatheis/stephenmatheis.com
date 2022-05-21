import { readFile } from 'fs/promises'
import { component } from '../robilite.js'

export async function jobs() {
    const jobsRes = await readFile('./data/jobs.json');
    const jobs = JSON.parse(jobsRes);

    return component({
        data: jobs,
        render(job) {
            const  {
                title,
                company,
                location,
                start,
                end,
                lines,
                stack,
                languages
            } = job;

            return /*html*/ `
                <div class="job">
                    <div class="job-heading title">
                        ${title ? `<span style='font-weight: 800;'>${title}</span> at` : ''} ${company || ''}
                    </div>
                    <div class="job-heading date">
                        ${start}<span style='padding: 0px 5px;'>➜</span>${end}
                        ${location ? `in ${location}` : ''}
                    </div>
                    <div style='font-size: 12px; margin-top: 4px;'>
                        <span style='font-weight: 500; background: lightgray;'>Languages</span>
                        <span>${languages || 'N/A'}</span>
                    </div>
                    <div style='font-size: 12px;'>
                        <span style='font-weight: 500;'>Stack</span>
                        <span>${stack || 'N/A'}</span>
                    </div>
                    <div>
                        <ul>
                            ${
                                component({
                                    data: lines,
                                    render(line) {
                                        return /*html*/ `
                                            <li>${line}</li>
                                        `
                                    }
                                })
                            }
                        <ul>
                    </div>
                </div>
            `
        }
    });
}