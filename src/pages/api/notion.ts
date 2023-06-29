import { UpdatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from '../../utils'
import { NotionUser, notionClient } from '../../utils/notion'

export const updateNotionUser = async (data: NotionUser, id?: string) => {
	return await notionClient.pages.update({
		page_id: id ?? data.id,
		properties: data.properties as unknown as UpdatePageParameters['properties'],
	})
}

export const getNotionUsers = async () => {
	const results: NotionUser[] = []

	let query = await notionClient.databases.query({
		database_id: process.env.NOTION_GUEST_DB_ID,
	})
	results.push(...(query.results as NotionUser[]))

	while (query.has_more) {
		query = await notionClient.databases.query({
			database_id: process.env.NOTION_GUEST_DB_ID,
			start_cursor: query.next_cursor,
		})
		results.push(...(query.results as NotionUser[]))
	}

	return results
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case 'GET': {
			res.json(await getNotionUsers())
			break
		}
		case 'PUT': {
			const user = req.body.data as NotionUser
			res.json(await updateNotionUser(user))
			break
		}
	}
}

export default withSessionRoute(handler)
