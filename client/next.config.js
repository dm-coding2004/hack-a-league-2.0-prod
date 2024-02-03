/** @type {import('next').NextConfig} */
const nextConfig = { async rewrites() {
    return [
      {
        source: '/chatbot',
        destination: 'http://localhost:3001' // Proxy to Backend
      }
    ]
  }}

module.exports = nextConfig
