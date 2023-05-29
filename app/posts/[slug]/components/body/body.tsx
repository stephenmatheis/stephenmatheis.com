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
    pre: Code,
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
