import { readFile } from 'fs/promises'
import { component } from '../robilite.js'

export async function skills() {
    const skillsRes = await readFile('data/skills.json');
    const skills = JSON.parse(skillsRes);

    const curentYear = new Date().getFullYear();
    const max = Math.max(...skills.map(skill => parseInt(curentYear - skill.started)));

    return component({
        data: skills,
        render(skill) {
            const { name, started } = skill;

            const years = curentYear - started || 1;
            const width = Math.round((parseInt(years) / max) * 100);

            return /*html*/ `
                <div class="skill">
                    <div class='name-years'>
                        <span class="name">${name}</span>
                        <span class="years">${years} ${parseInt(years) === 1 ? 'year' : 'years'}</span>
                    </div>
                    <div class="skill-bar" style="width: ${width}%"></div>
                </div>
            `
        }
    });
}