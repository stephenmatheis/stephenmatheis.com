import { Feed } from 'feed';
import getPosts from '@/lib/get-posts';

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
            email: 'stephen@mathis.email',
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
                content: post.body,
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
