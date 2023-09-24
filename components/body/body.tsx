import { ReactNode, PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import rehypePrettyCode from 'rehype-pretty-code';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { LinkCtr } from '@/components/link-ctr';
import { CopyToClipboard } from '@/components/copy-to-clipboard';
import { SelectCell } from '@/components/select-cell';
import { Children, cloneElement } from 'react';

function getAnchor(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/[ ]/g, '-');
}

function Heading({ as, children, ...props }) {
    const As = as;
    const anchor = getAnchor(children);
    const link = `#${anchor}`;

    return (
        <Link href={link} className="anchor" {...props}>
            <span className="anchor-link">#</span>
            <As id={anchor}>{children}</As>
        </Link>
    );
}

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

export function Body({ children, id }: { children: string; id?: string }) {
    const components = {
        h2: ({ children }: any) => <Heading as={'h2'}>{children}</Heading>,
        h3: ({ children }: any) => <Heading as={'h3'}>{children}</Heading>,
        h4: ({ children }: any) => <Heading as={'h4'}>{children}</Heading>,
        h5: ({ children }: any) => <Heading as={'h5'}>{children}</Heading>,
        h6: ({ children }: any) => <Heading as={'h6'}>{children}</Heading>,
        a: ({ children, ...props }: any) => {
            return (
                // <LinkCtr href={props.href || ''} newTab={true}>
                <LinkCtr href={props.href.replaceAll('%7Bid%7D', id) || ''}>
                    {children}
                </LinkCtr>
            );
        },
        img: ResponsiveImage,
        pre: ({ children }) => {
            return (
                <CopyToClipboard>
                    <pre>{children}</pre>
                </CopyToClipboard>
            );
        },
        SelectCell: () => <SelectCell />,
        Footnotes: ({ children }) => (
            <div className="footnotes">
                <hr />
                <ol>
                    {Children.map(children, (child, i) =>
                        cloneElement(child, { number: i + 1 })
                    )}
                </ol>
            </div>
        ),
        Note: ({ children, number }) => (
            <li id={`${id}-${number}`}>{children}</li>
        ),
        Sup: ({ children }) => (
            <sup className="superscript">
                <a href={`#${id}-${children}`}>{children}</a>
            </sup>
        ),
    };

    const options = {
        theme: 'css-variables',
        keepBackground: false,
        // Callback hooks to add custom logic to nodes when visiting them.
        onVisitLine(node: { children: string | any[] }) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
                node.children = [{ type: 'text', value: ' ' }];
            }
        },
        onVisitHighlightedLine(node: {
            properties: { className: string[]; id: string };
            position: { start: { line: any } };
        }) {
            // Each line node by default has `class="line"`.
            node.properties.className.push('highlighted');

            node.properties.id = `post-${id}-ln-${node.position.start.line}`;
        },
        onVisitHighlightedWord(
            node: {
                properties: {
                    [x: string]: any;
                    className: string[];
                    style: string;
                };
                children: any[];
            },
            id: any
        ) {
            // Each word node has no className by default.
            node.properties.className = ['word'];

            if (id) {
                // If the word spans across syntax boundaries (e.g. punctuation), remove
                // colors from the child nodes.
                if (node.properties['data-rehype-pretty-code-wrapper']) {
                    node.children.forEach((childNode) => {
                        childNode.properties.style = '';
                    });
                }

                node.properties.style = '';
                node.properties['data-word-id'] = id;
            }
        },
    };

    return (
        <MDXRemote
            source={children}
            options={{
                mdxOptions: {
                    rehypePlugins: [[rehypePrettyCode, options]],
                },
            }}
            components={components}
        />
    );
}
