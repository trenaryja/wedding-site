import type { NextConfig } from 'next'
import './src/env' // validates at dev/build start, so a bad var fails here rather than on the first request

const nextConfig: NextConfig = {
	reactCompiler: true,
	experimental: { turbopackRustReactCompiler: true },
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
		],
	},
}

export default nextConfig
