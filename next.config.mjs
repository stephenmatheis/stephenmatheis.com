/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx',],
    reactStrictMode: true,

    /**
     * This branch is archived as-is, mid-experiment. The code compiles, but
     * `next build` runs ESLint afterward and the WIP `components/title/swap.js`
     * trips the parser, which fails the whole build. Skipping lint lets the
     * archive show exactly where the work stopped instead of hiding it.
     */
    eslint: {
        ignoreDuringBuilds: true,
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
