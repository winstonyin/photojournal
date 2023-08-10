/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './app/components/image-loader.tsx',
  }
}

module.exports = nextConfig
