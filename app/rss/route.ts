import { Feed } from 'feed';
import getPosts from '@/lib/get-posts';

export async function GET() {
    const posts = await getPosts();

    const feed = new Feed({
        title: 'Stephen Matheis',
        description: "Stephen Matheis' blog",
        id: 'https://stephenmatheis-com.vercel.app',
        link: 'https://stephenmatheis-com.vercel.app',
        language: 'en',
        image: 'https://stephenmatheis-com.vercel.app/memoji.png',
        favicon: 'https://stephenmatheis-com.vercel.app/favicons/favicon.ico',
        copyright: `Copyright © ${new Date().getFullYear()}, Stephen Matheis`,
        generator: 'Next.js + Feed for Node.js',
        feedLinks: {
            json: 'https://stephenmatheis-com.vercel.app/json',
            atom: 'https://stephenmatheis-com.vercel.app/rss',
        },
        author: {
            name: 'Stephen Matheis',
            email: 'stephen@mathis.email',
            link: 'https://stephenmatheis-com.vercel.app/johndoe',
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

    const rss = feed.rss2();

    return new Response(rss, {
        headers: {
            'Content-Type': 'text/xml',
        },
    });
}
