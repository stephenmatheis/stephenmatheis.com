import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        quietDeps: true,
        silenceDeprecations: ['legacy-js-api', 'global-builtin', 'import'],
        logger: {
            warn(message) {
                console.warn(message);
            },
            debug(message) {
                console.log(message);
            },
        },
    },
    env: {
        version: process.env.npm_package_version || '',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.tidesandcurrents.noaa.gov',
            },
        ],
    },
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
