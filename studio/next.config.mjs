/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    try {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
        }
      }
      
      // Force @ alias to resolve correctly - must be absolute path
      const studioPath = path.resolve(__dirname)
      
      // Override any existing alias
      if (!config.resolve) {
        config.resolve = {}
      }
      if (!config.resolve.alias) {
        config.resolve.alias = {}
      }
      
      config.resolve.alias['@'] = studioPath
      
      // Ensure proper module resolution
      if (!config.resolve.modules) {
        config.resolve.modules = []
      }
      config.resolve.modules = [
        studioPath,
        path.join(studioPath, 'node_modules'),
        ...config.resolve.modules.filter(m => !m.includes(studioPath)),
        'node_modules',
      ]
      
      console.log('[Next.js Config] @ alias set to:', studioPath)
      console.log('[Next.js Config] Resolve modules:', config.resolve.modules)
    } catch (error) {
      console.error('[Next.js Config] Webpack config error:', error)
    }
    
    return config
  },
}

export default nextConfig
