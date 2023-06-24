import getPosts from './get-posts';
import { Feed } from 'feed';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { mangle } from 'marked-mangle';

const renderer = new marked.Renderer();

renderer.link = (href, _, text) =>
    `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

marked.use(gfmHeadingId(), mangle(), {
    gfm: true,
    breaks: true,
    renderer,
});

function renderPost(md: string) {
    return marked.parse(md);
}

export async function generateFeed(type: string) {
    const posts = await getPosts();
    const site = 'https://stephenmatheis-com.vercel.app';
    const feed = new Feed({
        title: 'Stephen Matheis',
        description: "Stephen Matheis' blog",
        id: `${site}/${type}`,
        link: site,
        language: 'en',
        image: `${site}/memoji.png`,
        favicon: `${site}/favicon.ico`,
        copyright: `Copyright © ${new Date().getFullYear()}, Stephen Matheis`,
        generator: 'Next.js + Feed for Node.js',
        feedLinks: {
            json: `${site}/json`,
            atom: `${site}/rss`,
        },
        author: {
            name: 'Stephen Matheis',
            link: site,
        },
    });

    posts.forEach(
        (post: {
            slug: any;
            title: any;
            body: any;
            date: string | number | Date;
        }) => {
            const url = `https://stephenmatheis-com.vercel.app/posts/${post.slug}`;

            feed.addItem({
                title: post.title,
                id: url,
                link: url,
                content: renderPost(post.body),
                author: [
                    {
                        name: 'Stephen Matheis',
                        email: 'stephen@matheis.email',
                        link: 'https://stephenmatheis.com',
                    },
                ],
                date: new Date(post?.date),
            });
        }
    );

    return feed;
}
