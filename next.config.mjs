/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'diamantblue.com' },
      { protocol: 'https', hostname: 'images.getaroom-cdn.com' },
      { protocol: 'https', hostname: 'apart-diamant-blue.costablanca-hotels.com' },
      { protocol: 'https', hostname: 'www.costablanca-hotels.com' },
      { protocol: 'https', hostname: 'foto.hrsstatic.com' },
    ],
  },
};

export default nextConfig;
