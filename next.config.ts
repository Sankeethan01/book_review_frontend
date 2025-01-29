import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com", // Google-hosted images
      "books.google.com", // Google Books API
      "lh3.googleusercontent.com", // Google-related images
    ],
  },
};

export default nextConfig;
