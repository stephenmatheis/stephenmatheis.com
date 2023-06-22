import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { Feed } from 'feed';
import RSS from 'rss';
import path from 'path';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { mangle } from 'marked-mangle';
import matter from 'gray-matter';

const posts = readdirSync(path.resolve(__dirname, '../_posts/'))
    .filter(
        (file) => path.extname(file) === '.md' || path.extname(file) === '.mdx'
    )
    .map((file) => {
        const postContent = readFileSync(`./_posts/${file}`, 'utf8');
        const { data, content }: { data: any; content: string } =
            matter(postContent);
        return { ...data, body: content, slug: path.parse(file).name };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

function main(): void {
    // const feed = new RSS({
    //     title: 'Stephen Matheis',
    //     description: "Stephen Matheis' blog",
    //     feed_url: 'https://stephenmatheis-com.vercel.app/feed.xml',
    //     site_url: 'https://stephenmatheis-com.vercel.app',
    //     copyright: `${new Date().getFullYear()} Stephen Matheis`,
    //     pubDate: new Date(),
    //     language: 'en',
    // });

    const feed = new Feed({
        title: 'Stephen Matheis',
        description: "Stephen Matheis' blog",
        id: 'http://example.com/',
        link: 'http://example.com/',
        language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
        image: 'http://example.com/image.png',
        favicon: 'http://example.com/favicon.ico',
        copyright: 'All rights reserved 2013, John Doe',
        updated: new Date(2013, 6, 14), // optional, default = today
        generator: 'awesome', // optional, default = 'Feed for Node.js'
        feedLinks: {
            json: 'https://example.com/json',
            atom: 'https://example.com/atom',
        },
        author: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            link: 'https://example.com/johndoe',
        },
    });

    posts.forEach((post) => {
        const url = `https://stephenmatheis-com.vercel.app/posts/${post.slug}`;

        // feed.item({
        //     title: post.title,
        //     description: renderPost(post.body),
        //     date: new Date(post?.date),
        //     author: 'Stephen Matheis',
        //     url,
        //     guid: url,
        // });

        feed.addItem({
            title: post.title,
            id: url,
            link: url,
            // description: post.description,
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
    });

    // const rss = feed.xml({ indent: true });

    const json = feed.json1();
    const rss = feed.rss2();

    writeFileSync(path.join(__dirname, '../public/feed.json'), json);
    writeFileSync(path.join(__dirname, '../public/feed.xml'), rss);
}

main();
