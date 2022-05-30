import prettier from './libraries/prettier.js'
import parserBabel from './libraries/parser-babel.js'
import parserHTML from './libraries/parser-html.js'

import { writeFile } from 'fs/promises'
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

const formatted = prettier.format(app, {
    parser: 'babel',
    plugins: [parserBabel, parserHTML]
});

await writeFile(`formatted.html`, formatted);