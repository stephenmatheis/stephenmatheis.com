/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Link from 'next/link';
import macbook from '@/public/images/macbook.webp';
import styles from './page.module.scss';

const groups = [
    {
        name: 'Hardware',
        label: 'I use',
        links: [
            {
                label: 'MacBook Pro 16',
                href: 'https://www.apple.com/shop/buy-mac/macbook-pro/16-inch',
            },
            {
                label: 'Studio Display',
                href: 'https://www.apple.com/shop/buy-mac/apple-studio-display',
            },
            {
                label: 'Logitech MX Master 3S',
                href: 'https://www.logitech.com/en-us/products/mice/mx-master-3s',
            },
            {
                label: 'Secretlab TITAN Evo',
                href: 'https://secretlab.co/pages/titan-evo-2022-series',
            },
            {
                label: 'Secretlab MAGNUS Pro',
                href: 'https://secretlab.co/pages/magnus-pro',
            },
            {
                label: 'Keychron K2 Pro',
                href: 'https://www.keychron.com/products/keychron-k2-pro-qmk-via-wireless-mechanical-keyboard',
            },
        ],
    },
    {
        name: 'Software',
        label: 'I use',
        links: [
            {
                label: 'VS Code',
                href: 'https://code.visualstudio.com/',
            },
            {
                label: 'GitHub Desktop',
                href: 'https://github.com/apps/desktop',
            },
            {
                label: 'Figma',
                href: 'https://www.figma.com/',
            },
            {
                label: 'Heynote',
                href: 'https://heynote.com/',
            },
            {
                label: 'Raycast',
                href: 'https://www.raycast.com/',
            },
            {
                label: 'Warp',
                href: 'https://www.warp.dev/',
            },
            {
                label: 'Chrome',
                href: 'https://www.google.com/chrome/',
            },
            {
                label: 'Rectangle',
                href: 'https://rectangleapp.com/',
            },
        ],
    },
    {
        name: 'VS Code extensions',
        label: 'I use',
        links: [
            {
                label: 'VS Code',
                href: 'https://code.visualstudio.com/',
            },
        ],
    },
    {
        name: 'Tools',
        label: 'I use',
        links: [
            {
                label: 'HTML Color Codes',
                href: 'https://htmlcolorcodes.com/',
            },
            {
                label: 'CSS Grid Generator',
                href: 'https://cssgrid-generator.netlify.app/',
            },
            {
                label: 'ChatGPT',
                href: 'https://chatgpt.com/',
            },
            {
                label: 'Figma',
                href: 'https://www.figma.com/',
            },
            {
                label: 'Figma',
                href: 'https://www.figma.com/',
            },
        ],
    },
    {
        name: 'Figma plugins',
        label: 'I use',
        links: [
            {
                label: 'html.to.design',
                href: 'https://www.figma.com/community/plugin/1159123024924461424/html-to-design-import-websites-to-figma-designs-web-html-css',
            },
        ],
    },
    {
        name: 'Platforms',
        label: 'I use',
        links: [
            {
                label: 'Vercel',
                href: 'https://vercel.com/',
            },
            {
                label: 'Netlify',
                href: 'https://www.netlify.com/',
            },
            {
                label: 'AWS',
                href: 'https://aws.amazon.com/',
            },
            {
                label: 'Hover',
                href: 'https://www.hover.com/',
            },
        ],
    },
    {
        name: 'People',
        label: 'that inspire me',
        links: [
            {
                label: 'Lynn Fisher',
                href: 'https://a.singlediv.com/',
            },
            {
                label: 'Kevin Powell',
                href: 'https://www.youtube.com/@KevinPowell',
            },
            {
                label: 'Grazzy',
                href: 'https://www.youtube.com/@Grazzyy',
            },
            {
                label: 'Ichika Nito',
                href: 'https://www.youtube.com/@ichika_nito',
            },
            {
                label: 'Lazy Devs',
                href: 'https://www.youtube.com/@LazyDevs',
            },
        ],
    },
    {
        name: 'Books',
        label: 'I like',
        links: [
            {
                label: 'Cinnamon Bun',
                href: 'https://www.royalroad.com/fiction/31429/cinnamon-bun',
            },
            {
                label: 'Tomes & Tea',
                href: 'https://rebeccathorne.net/cozy-fantasy/ƒ',
            },
            {
                label: 'Murderbot Diaries',
                href: 'https://www.marthawells.com/murderbot.htm',
            },
            {
                label: 'This Trilogy is Broken',
                href: 'https://www.amazon.com/dp/B08S3FZZNT',
            },
            {
                label: 'Wheel of Time',
                href: 'https://us.macmillan.com/series/wheeloftime',
            },
        ],
    },
    {
        name: 'Sites',
        label: 'I visit',
        links: [
            {
                label: 'Daring Fireball',
                href: 'https://daringfireball.net/',
            },
            {
                label: 'Hacker News',
                href: 'https://news.ycombinator.com/',
            },
            {
                label: 'Reddit',
                href: 'https://www.reddit.com/',
            },
            {
                label: 'The Verge',
                href: 'https://www.theverge.com/',
            },
        ],
    },
    {
        name: 'Games',
        label: 'I love',
        links: [
            {
                label: 'Magic: The Gathering',
                href: 'https://magic.wizards.com/en',
            },
            {
                label: 'Breath of the Wild',
                href: 'https://zelda.nintendo.com/breath-of-the-wild/',
            },
            {
                label: 'Tears of the Kingdom',
                href: 'https://zelda.nintendo.com/tears-of-the-kingdom/',
            },
            {
                label: 'Ocarina of Time',
                href: 'https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Ocarina_of_Time',
            },
            {
                label: 'Horizon Series',
                href: 'https://www.playstation.com/en-us/horizon/',
            },

            {
                label: 'World of Warcraft',
                href: 'https://worldofwarcraft.blizzard.com/en-us/',
            },
        ],
    },
    {
        name: 'Vehicles',
        label: 'I own',
        links: [
            {
                label: '2008 HD FLHTCU',
                href: 'https://www.reddit.com/r/Harley/comments/1e5lbgd/my_happy_place/',
            },
            {
                label: '2006 Honda S2000',
                href: 'https://en.wikipedia.org/wiki/Honda_S2000',
            },
        ],
    },
];

export default function LinksPage() {
    return (
        <div className={styles.links}>
            <Link href="/">
                <div className={styles.avatar}>
                    <Image
                        src={macbook}
                        alt="My memoji behind a MacBook"
                        priority
                    />
                </div>
            </Link>
            <nav>
                {groups.map(({ name, label, links }) => {
                    return (
                        <div key={label} className={styles.group}>
                            <div className={styles.text}>
                                <span className={styles.name}>{name}</span>{' '}
                                <span className={styles.title}>{label}</span>
                            </div>
                            <ul className={styles.list}>
                                {links
                                    .sort((a, b) =>
                                        a.label.localeCompare(b.label)
                                    )
                                    .map(({ label, href }) => {
                                        return (
                                            <li key={label}>
                                                <Link
                                                    href={href}
                                                    target="_blank"
                                                >
                                                    {label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}
