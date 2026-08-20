import { env } from '@/env'
import type { CloudinaryImage } from '@/utils'
import cloudinary from 'cloudinary'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	cloudinary.v2.config({
		cloud_name: env.CLOUDINARY_API_CLOUD_NAME,
		api_key: env.CLOUDINARY_API_KEY,
		api_secret: env.CLOUDINARY_API_SECRET,
		secure: true,
	})

	const results = (
		await cloudinary.v2.api.resources({
			type: 'upload',
			prefix: 'wedding',
			max_results: 500,
		})
	).resources.sort(
		(a: CloudinaryImage, z: CloudinaryImage) => new Date(a.created_at).getTime() - new Date(z.created_at).getTime(),
	) as CloudinaryImage[]

	// `secure_url`, not `url` — the Admin API's `url` is http:// regardless of `secure: true` above,
	// which only affects the SDK's URL builders. next/image is configured for https only.
	res.status(200).json(results.map(({ width, height, secure_url: url }) => ({ width, height, url })))
}

export default handler
