import { component } from '../robilite.js'
import { jobs } from './jobs.js'
import { skills } from './skills.js'
import { certs } from './certs.js'
import { education } from './education.js'
import { contact } from './contact.js'

export async function main() {
    return component(/*html*/ `
        <!-- Main -->
        <main>
            <section class="left">
                <div id="experience" class="container">
                    <h2>Experience</h2>
                    ${await jobs()}
                </div>
            </section>
            <section class="right">
                <div id="skills" class="container">
                    <h2>Skills</h2>
                    ${await skills()}
                </div>
                ${certs()}
                ${education()}
                ${contact()}
            </section>
        </main>
    `);
}