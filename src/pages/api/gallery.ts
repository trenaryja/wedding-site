import { fetchImageUrls } from 'google-photos-album-image-url-fetch'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { albumId } = req.query
	if (typeof albumId !== 'string') {
		res.status(400).json({ message: 'Missing albumId' })
		return
	}
	const url = `https://photos.app.goo.gl/${albumId}`
	const data = await fetchImageUrls(url)
	const imageUrls = (data ?? []).map((x) => x.url)
	res.json(imageUrls)
}

export default handler
