import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com", // Google-hosted images
      "books.google.com", // Google Books API
      "lh3.googleusercontent.com", // Google-related images
      "m.media-amazon.com",
      "img.pikbest.com",
      "thumbs.dreamstime.com",
      "cdn.britannica.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com", // ✅ Allow Freepik images
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // ✅ Allow Unsplash images
      }
    ],
  },
};

export default nextConfig;
