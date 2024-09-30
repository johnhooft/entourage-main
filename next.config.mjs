// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          hostname: 'pixabay.com',
        },
        {
          hostname: 'images.unsplash.com'
        },
        {
          hostname: 'qrengcbkopwqcuirwapp.supabase.co'
        }
      ],
    },
  };
  
export default nextConfig;  