import { component } from '../robilite.js'

export function contact() {
    return component(/*html*/ `
        <div id="contacts" class="container">
            <h2 class=>Contact</h2>
            <div class="contact email">
                <div class="contact title">Email</div>
                <a href="mailto:stephen.a.matheis@gmail.com">stephen.a.matheis@gmail.com</a>
            </div>
            <div class="contact phone">
                <div class="contact title">Phone</div>
                <a href="tel:9124922522">(912) 492-2522</a>
            </div>
        </div>
    `);
}