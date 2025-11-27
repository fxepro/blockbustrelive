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
  // Ensure Next.js reads tsconfig paths
  experimental: {
    // This might help with path resolution
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
      
      // Override any existing alias - use both @ and @/ patterns
      if (!config.resolve) {
        config.resolve = {}
      }
      if (!config.resolve.alias) {
        config.resolve.alias = {}
      }
      
      // Set alias for @ - must override any existing
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@': studioPath,
      }
      
      // Preserve existing modules array but ensure studio path is included
      const existingModules = config.resolve.modules || []
      if (!existingModules.includes(studioPath)) {
        config.resolve.modules = [studioPath, ...existingModules]
      }
    } catch (error) {
      console.error('[Next.js Config] Webpack config error:', error)
    }
    
    return config
  },
}

export default nextConfig
