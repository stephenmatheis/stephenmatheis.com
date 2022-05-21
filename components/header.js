import { component } from '../robilite.js'

export function header() {
    return component(/*html*/ `
        <!-- Header -->
        <header>
            <div id="profile" class="container flex align-center justify-between">
                <div>
                    <a href="https://www.stephenmatheis.com">
                        <h1 class="name">Stephen Matheis</h1>
                    </a>
                    <h4 class="title">Software Developer</h4>
                </div>
                <div class="links">
                    <a href="https://github.com/stephenmatheis" target="_blank" title='GitHub'>
                        <svg class="icon icon-github">
                            <use xlink:href="#icon-github"></use>
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/stephenmatheis/" target="_blank" title='LinkedIn'>
                        <svg class="icon icon-linkedin">
                            <use xlink:href="#icon-linkedin"></use>
                        </svg>
                    </a>
                </div>
            </div>
        </header>
    `);
}
