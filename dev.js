import { component } from './robilite.js'
import { header } from './components/header.js'
import { main } from './components/main.js'
import { footer } from './components/footer.js'

const app = component(/*html*/`
    ${header()}
    ${await main()}
    ${footer()}
`);

document.querySelector('#app').innerHTML = app;