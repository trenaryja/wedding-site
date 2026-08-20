import type { NextConfig } from 'next'
import './src/env' // validates at dev/build start, so a bad var fails here rather than on the first request

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'res.cloudinary.com',
			},
		],
	},
}

export default nextConfig
