import { component } from '../robilite.js'

export function certs() {
    return component(/*html*/ `
        <div class="cert">
            <div class='flex align-center justify-between'>
                <div class="cert-name">CompTIA Security+</div>
                <a href="https://www.credly.com/badges/3e13de8d-cda2-4472-a29a-588339f5cbc3" target="_blank">
                    <img src='images/comptia-security-ce-certification-144x144.png' class='cert-badge' title='CompTIA Security+'>
                </a>
            </div>
            <div class="cert-date">
                <span class='bold'>Issued</span>
                <span class="date">April 20, 2018</span>
            </div>
            <div class="cert-date">
                <span class='bold'>Expires</span>
                <span class="date">April 20, 2024</span>
            </div>
        </div>
    `);
}