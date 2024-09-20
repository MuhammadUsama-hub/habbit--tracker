// next.config.mjs

export default {
    webpack: (config, { isServer }) => {
      // Customize the Webpack config here
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
          path: false,
          os: false,
          net: false,
          tls: false,
          mongoose: false, // Ensure mongoose is not bundled client-side
        };
      }
  
      // Return the updated Webpack configuration
      return config; // Make sure to return the config object
    },
  };
  