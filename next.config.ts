import type { NextConfig } from 'next'
import './src/env' // validates at dev/build start, so a bad var fails here rather than on the first request

const nextConfig: NextConfig = {
	agentRules: false, // next dev otherwise writes AGENTS.md at the root whenever an agent runs it
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
