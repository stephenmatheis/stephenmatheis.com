import { component } from './robilite.js'
import { license } from './components/license.js'
import { header } from './components/header.js'
import { main } from './components/main.js'
import { footer } from './components/footer.js'

const app = component(/*html*/`
    ${license()}
    <!DOCTYPE html>
    <html lang="en">
        <body>
            ${header()}
            ${await main()}
            ${footer()}
        </body>
    </html>
`);

console.log(app);