import type { NotionUser } from '@/utils'
import { getNotionUsers, getSession, notionClient } from '@/utils/server'
import type { UpdatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import type { NextApiRequest, NextApiResponse } from 'next'

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
		case 'GET': {
			res.json(await getNotionUsers())
			break
		}
		case 'PUT': {
			const user = req.body.data as NotionUser
			res.json(
				await notionClient.pages.update({
					// admin PUT always supplies a persisted Notion user, which has an id
					page_id: user.id!,
					properties: user.properties as unknown as UpdatePageParameters['properties'],
				}),
			)
			break
		}
		default: {
			res.setHeader('Allow', 'GET, PUT')
			res.status(405).json({ message: 'Method Not Allowed' })
		}
	}
}

export default handler
