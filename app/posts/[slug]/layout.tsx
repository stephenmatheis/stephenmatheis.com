import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import getPosts from '@/lib/get-posts';
import Date from '@/components/date';
import Nav from './components/nav';
import styles from './layout.module.scss';

export async function generateStaticParams() {
    const posts = await getPosts();

    return posts.map((post) => ({ slug: post.slug }));
}

export const generateMetadata = async ({
    params,
}: {
    params: {
        slug: string;
    };
}): Promise<Metadata> => {
    const post = (await getPosts()).find((p) => p?.slug === params.slug);

    return {
        title: post?.title,
        description: post?.description,
        alternates: {
            canonical: `https://stephenmatheis.com/posts/${params.slug}`,
        },
    };
};

async function getData({ slug }: { slug: string }) {
    const posts = await getPosts();
    const postIndex = posts.findIndex((p) => p?.slug === slug);
    const post = posts[postIndex];

    if (!post) {
        return undefined;
    }

    const { ...rest } = post;

    return {
        previous: posts[postIndex + 1] || null,
        next: posts[postIndex - 1] || null,
        ...rest,
    };
}

export default async function PostLayout({
    children,
    params,
}: {
    children: JSX.Element;
    params: {
        slug: string;
    };
}) {
    const post = await getData(params);

    if (!post) return notFound();

    const { previous, next, title, date, lastModified } = post;

    return (
        <main className={styles.layout}>
            <h1>{title}</h1>
            <article>
                <Date className={styles.date} dateString={date} />
                {children}
            </article>
            {lastModified && (
                <div className={styles.date}>
                    Last modified <Date dateString={lastModified} />
                </div>
            )}
            <Nav previous={previous} next={next} />
        </main>
    );
}
