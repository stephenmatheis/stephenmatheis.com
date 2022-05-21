import { component } from '../robilite.js'

export function footer() {
    return component(/*html*/ `
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Stephen Matheis</title>
        <link rel="apple-touch-icon" sizes="180x180" href="favicons/light/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/light/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="favicons/light/favicon-16x16.png">
        <link rel="preload" as="image" href="images/comptia-security-ce-certification-144x144.png">
        <link rel="stylesheet" href="style.css">
    </head>
    `);
}
