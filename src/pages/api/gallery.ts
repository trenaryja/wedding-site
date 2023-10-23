import { fetchImageUrls } from 'google-photos-album-image-url-fetch'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from '../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { albumId } = req.query
	const url = `https://photos.app.goo.gl/${albumId}`
	const data = await fetchImageUrls(url)
	const imageUrls = data.map((x) => x.url)
	res.json(imageUrls)
}

export default withSessionRoute(handler)
