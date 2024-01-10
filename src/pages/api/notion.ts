import { NotionUser, notionClient, withSessionRoute } from '@/utils'
import { UpdatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { NextApiRequest, NextApiResponse } from 'next'

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
		// console.log(query.results[0].properties)
		results.push(...(query.results as NotionUser[]))
	}

	return results.sort((a, b) =>
		a.properties.Name.title[0].text.content.localeCompare(b.properties.Name.title[0].text.content),
	)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default withSessionRoute(handler)
