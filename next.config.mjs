/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    reactStrictMode: true,

    /**
     * This branch is archived as-is. Vercel refuses to deploy next-mdx-remote
     * below 6.0.0, and v6 brings MDX 3, which is built on a newer unified.
     * The old rehype-pretty-code plugin still runs fine against it, but its
     * types describe the older unified, so the type check fails. Skipping it
     * keeps the archived code untouched.
     */
    typescript: {
        ignoreBuildErrors: true,
    },

    sassOptions: {
        logger: {
            /**
             * @param {string} message
             */
            warn(message) {
                console.warn(message);
            },
            /**
             * @param {string} message
             */
            debug(message) {
                console.log(message);
            },
        },
    },
};

export default nextConfig;
