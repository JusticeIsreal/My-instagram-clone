/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "links.papareact.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "google.com",
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
