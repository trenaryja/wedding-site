import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from '../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { albumId } = req.query
	const raw = await fetch(`https://photos.app.goo.gl/${albumId}`)
	const source = await raw.text()
	const regex = /https:\/\/lh3\.googleusercontent\.com\/pw\/.*?=w/g
	const links = Array.from(source.matchAll(regex), (match) => `${match[0]}9999`)
	res.json(Array.from(links))
}

export default withSessionRoute(handler)
