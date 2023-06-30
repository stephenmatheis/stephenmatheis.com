// Create Posts

import { writeFile } from 'fs/promises';

const tags = ['one', 'two', 'three', 'four', 'five'];

for (let i = 0; i < 100; i++) {
    const name = `Test Post ${i}`;
    const date = new Date(2023, 3 - Math.floor(i / 5), 1).toLocaleDateString(
        'en-US',
        {
            dateStyle: 'long',
            timeZone: process.env.NEXT_PUBLIC_TIME_ZONE,
        }
    );
    const text = `---
title: ${name}
date: ${date}
lastModified: ${date}
author: Stephen Matheis
tags: 
    - ${tags[getRandomInt(4)]}
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Pulvinar mattis nunc sed blandit libero volutpat. Facilisis volutpat est velit egestas dui id ornare arcu odio. Nec feugiat nisl pretium fusce id velit ut tortor. Nibh ipsum consequat nisl vel pretium lectus quam id leo. A iaculis at erat pellentesque adipiscing. Libero justo laoreet sit amet cursus sit. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Eget magna fermentum iaculis eu non diam phasellus. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Montes nascetur ridiculus mus mauris vitae. Dis parturient montes nascetur ridiculus mus mauris vitae. Tincidunt augue interdum velit euismod. Sit amet justo donec enim diam vulputate ut pharetra. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Blandit massa enim nec dui nunc mattis enim ut. Non odio euismod lacinia at quis. In fermentum et sollicitudin ac orci.

> Enim tortor at auctor urna. Ut morbi tincidunt augue interdum. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Lorem ipsum dolor sit amet consectetur. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Egestas quis ipsum suspendisse ultrices gravida dictum. Diam in arcu cursus euismod quis viverra nibh cras pulvinar. Tincidunt augue interdum velit euismod in pellentesque massa. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Eu scelerisque felis imperdiet proin fermentum leo vel orci. Viverra adipiscing at in tellus. Pellentesque dignissim enim sit amet venenatis urna cursus eget nunc. Et netus et malesuada fames ac turpis egestas sed tempus. Sagittis purus sit amet volutpat consequat mauris nunc congue. Posuere sollicitudin aliquam ultrices sagittis. Neque egestas congue quisque egestas diam in arcu. Imperdiet nulla malesuada pellentesque elit eget gravida cum.
`;

    await writeFile(
        `./_posts/${name.toLocaleLowerCase().replaceAll(' ', '-')}.mdx`,
        text
    );
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
