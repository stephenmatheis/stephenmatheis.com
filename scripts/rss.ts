import { readdirSync, readFileSync, writeFileSync } from 'fs';
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
        return { ...data, body: content };
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
    const feed = new RSS({
        title: 'Stephen Matheis',
        site_url: 'https://stephenmatheis-com.vercel.app',
        feed_url: 'https://stephenmatheis-com.vercel.app/feed.xml',
        language: 'en',
        description: "Stephen Matheis' blog",
    });

    posts.forEach((post) => {
        const url = `https://stephenmatheis-com.vercel.app/posts/${post.slug}`;

        feed.item({
            title: post.title,
            description: renderPost(post.body),
            date: new Date(post?.date),
            author: 'Max Leiter',
            url,
            guid: url,
        });
    });

    const rss = feed.xml({ indent: true });
    writeFileSync(path.join(__dirname, '../public/feed.xml'), rss);
}

main();
