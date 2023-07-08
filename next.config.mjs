// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    // FIXME: Turn back on before merging
    // DEV:
    // reactStrictMode: true,
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
