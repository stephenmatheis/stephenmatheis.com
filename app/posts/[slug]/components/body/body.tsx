import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Code } from 'bright';

// import remarkGfm from 'remark-gfm'
// import rehypeSlug from 'rehype-slug'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// import remarkA11yEmoji from '@fec/remark-a11y-emoji'
// import remarkToc from 'remark-toc'

function ResponsiveImage(props: any) {
    return (
        <Image
            alt={props.alt}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            {...props}
        />
    );
}

const components = {
    a: ({ children, ...props }: any) => {
        return (
            <Link {...props} href={props.href || ''}>
                {children}
            </Link>
        );
    },
    img: ResponsiveImage,
    pre: ({ children, ...props }: any) => {
        Code.theme = 'light-plus';

        return (
            // https://github.com/vercel/next.js/issues/43537#issuecomment-1331054397
            // Related issue: https://github.com/microsoft/TypeScript/pull/51328
            // Next.js Doc: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#async-and-await-in-server-components
            // @ts-expect-error Async Server Component
            <Code lineNumbers {...props}>
                {children}
            </Code>
        );
    },
};

export default function Body({ children }: { children: string }) {
    return (
        // @ts-expect-error RSC
        <MDXRemote
            source={children}
            //   options={{
            //     mdxOptions: {
            //       remarkPlugins: [
            //         // Adds support for GitHub Flavored Markdown
            //         remarkGfm,
            //         // Makes emojis more accessible
            //         remarkA11yEmoji,
            //         // generates a table of contents based on headings
            //         remarkToc,
            //       ],
            //       // These work together to add IDs and linkify headings
            //       rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
            //     },
            //   }}
            components={components}
        />
    );
}
