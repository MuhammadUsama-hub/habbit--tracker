/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Only exclude mongoose on the client-side
        if (!isServer) {
          config.resolve.fallback = {
            fs: false,
            path: false,
            os: false,
            net: false,
            tls: false,
            'mongoose': false, // Ensures mongoose is not bundled client-side
          };
        }
}
}

export default nextConfig;
