import { NextApiRequest, NextApiResponse } from 'next'
import { combinePaths, withSessionRoute } from '../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { path } = req.query as { path?: string }
	const baseUrl = process.env.GITFRONT_MARKDOWN_URL
	const url = combinePaths(baseUrl, path ?? './README.md')
	const response = await fetch(url)
	const data = await response.text()
	res.json(data)
}

export default withSessionRoute(handler)
