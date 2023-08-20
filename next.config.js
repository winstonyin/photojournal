/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './app/components/image-loader.tsx',
  }
}

module.exports = nextConfig
