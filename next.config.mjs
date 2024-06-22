/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ["cdn.sanity.io",'lh3.googleusercontent.com', 'images.unsplash.com','avatars.githubusercontent.com'],
  },
}

export default nextConfig
