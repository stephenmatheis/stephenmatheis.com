const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    // Optionally provide remark and rehype plugins
    options: {
        // If you use remark-gfm, you'll need to use next.config.mjs
        // as the package is ESM only
        // https://github.com/remarkjs/remark-gfm#install
        remarkPlugins: [],
        rehypePlugins: [],
        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: "@mdx-js/react",
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    experimental: {
        // mdxRs: true,
    },
    reactStrictMode: true,
};

module.exports = withMDX(nextConfig);
