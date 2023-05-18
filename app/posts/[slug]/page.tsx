import { getPostBySlug, getAllPosts } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import Date from '@/components/date';

type PostParams = {
    author: string;
    content: string;
    date: string;
    title: string;
};

async function getData(slug: string): Promise<PostParams> {
    const { title, date, author, content } = getPostBySlug(slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
    ]);

    const html = await markdownToHtml(content || '');

    return {
        title,
        date,
        author,
        content: html,
    };
}

export async function generateStaticParams() {
    const posts = getAllPosts(['slug']);

    return posts.map(({ slug }) => ({
        slug,
    }));
}

type Props = {
    params: {
        slug: string;
    };
};

export default async function Page({ params: { slug } }: Props) {
    const { content, title, date, author } = await getData(slug);

    return (
        <main>
            <h1>{title}</h1>
            <div>{author}</div>
            <Date dateString={date} />
            <article dangerouslySetInnerHTML={{ __html: content }} />
        </main>
    );
}
