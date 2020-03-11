/** (C) Stephen Matheis 2019 */

import Component from '../../Actions/Component.js'
import Router from '../../Actions/Router.js'

export default function Component_Topbar(param) {
    const {
        route,
        adjacentElement
    } = param;
    
    const id = app.setComponentId();

    return Component({
        id,
        html: /*html*/ `
            <div id='${id}' class="topbar">
                <span class='home'>
                    <svg class="icon"><use href="./../Icons/symbol-defs.svg#icon-home"></use></svg>
                </span>
                <!-- Add icons after home -->
                <div class="settings-container">
                   <!-- Add icons to end of container -->
                </div>
            </div>
        `,
        style: /*css*/ `
            .topbar {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                width: 100vw;
                background: ${app.primaryColor};
            }

            /*
            .placeholder .icon {
                stroke: ${app.primaryColor};
                fill: ${app.primaryColor};
            }
            */

            /* Nav Container */
            .nav-container {
                display: flex;
                flex-direction: column;
                align-items: start;
                justify-content: center;
            }

            .topbar .nav,
            .home {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5em;
                font-weight: 400;
                padding: 15px;
                margin: 5px;
                border-bottom: solid 3px ${app.primaryColor};
            }

            .topbar .nav {
                border-radius: 4px 4px 0px 0px;
            }

            .topbar .nav.nav-selected {
                border-bottom: solid 3px ${app.secondaryColor};
            }

            /* Settings */
            .settings-container {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: start;
                justify-content: flex-end;
            }
        `,
        adjacentElement:adjacentElement,
        position: 'beforeend',
        register: false,
        events: [
            {
                selector: '.home',
                event: 'click',
                listener: routeHome
            },
            {
                selector: '.nav',
                event: 'click',
                listener: routeToView
            },
            {
                selector: '.topbar-route',
                event: 'click',
                listener: routeToView
            }
        ]
    });

    function routeHome() {
        removeSelectNav();

        Router('');
    }

    function routeToView() {
        removeSelectNav();

        this.classList.add('nav-selected');

        const newRoute = (this.id === 'Home') ? '' : this.id;

        Router(newRoute);
    }

    function removeSelectNav() {
        document.querySelectorAll('.nav').forEach((nav) => {
            nav.classList.remove('nav-selected');
        });
    }
}
