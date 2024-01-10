import { NotionUser } from '@/utils'
import { getNotionUsers, getSession, notionClient } from '@/utils/server'
import { UpdatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession(req, res)
	if (!session.data?.isAdmin) {
		res.status(403).json({ message: 'You are not an admin, stop it' } as Error)
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
					page_id: user.id,
					properties: user.properties as unknown as UpdatePageParameters['properties'],
				}),
			)
			break
		}
	}
}

export default handler
