import cloudinary from 'cloudinary'
import { NextApiRequest, NextApiResponse } from 'next'
import { CloudinaryImage, withSessionRoute } from '../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	cloudinary.v2.config({
		cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
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

	res.status(200).json(results.map(({ width, height, url }) => ({ width, height, url })))
}

export default withSessionRoute(handler)
