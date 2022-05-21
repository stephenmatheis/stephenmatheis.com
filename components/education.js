import { component } from '../robilite.js'

export function education() {
    return component(/*html*/ `
        <div class="education college">
            <a href="https://www.georgiasouthern.edu/campuses/armstrong-campus/" target="_blank">Armstrong
                Atlantic State University
            </a>
        </div>
        <div class="education major">Computer Science</div>
        <div class="education date">2006 - 2007</div>
    `);
}