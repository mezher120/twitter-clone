/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['upload.wikimedia.org']  // para poner las imagenes segun adress hay uqe poner los dominios aca y restartear
  }
}

module.exports = nextConfig
