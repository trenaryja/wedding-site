import { notionUserSchema } from '@/utils'
import { getNotionUsers, getSession, notionClient, parseBody } from '@/utils/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const putBodySchema = z.object({ data: notionUserSchema })

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession(req, res)

	if (!session.data?.isAdmin) {
		res.status(403).json({ message: 'You are not an admin, stop it' })
		return
	}

	if (!req.method) {
		res.status(400).json({ message: 'Missing request method' })
		return
	}

	switch (req.method) {
		case 'GET':
			res.json(await getNotionUsers())
			break
		case 'PUT': {
			const body = parseBody(putBodySchema, req, res)
			if (!body) return
			res.json(await notionClient.pages.update({ page_id: body.data.id, properties: body.data.properties }))
			break
		}
		default:
			res.setHeader('Allow', 'GET, PUT')
			res.status(405).json({ message: 'Method Not Allowed' })
	}
}

export default handler
