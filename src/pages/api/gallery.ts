import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from '../../utils'

const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { albumId } = req.query

	const raw = await fetch(`https://photos.app.goo.gl/${albumId}`)
	const source = await raw.text()

	const links = new Set<string>()
	let match: RegExpExecArray

	while ((match = regex.exec(source))) {
		links.add(match[1])
	}
	res.json(Array.from(links))
}

export default withSessionRoute(handler)
