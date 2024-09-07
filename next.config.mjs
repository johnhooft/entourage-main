// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          hostname: 'pixabay.com',
        },
      ],
    },
  };
  
export default nextConfig;  