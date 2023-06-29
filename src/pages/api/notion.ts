import { UpdatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from '../../utils'
import { NotionUser, Result, notionClient } from '../../utils/notion'

export const convertToNotionUsers = (data: Result[]): NotionUser[] => {
	return data.map((item) => {
		const { id, properties } = item
		return {
			id,
			name: properties.Name.title[0].plain_text,
			tags: properties.Tags.multi_select.map((tag) => tag.name),
			isAttending: properties.IsAttending.checkbox,
			isPlusOneAttending: properties.IsPlusOneAttending.checkbox,
			plusOneName: properties.PlusOneName.rich_text[0].plain_text,
			messageToUs: properties.MessageToUs.rich_text[0].plain_text,
			phone: properties.Phone.phone_number,
		}
	})
}

const convertFromNotionUser = (data: NotionUser, id?: string): UpdatePageParameters => {
	return {
		page_id: id ?? data.id,
		properties: {
			IsAttending: {
				checkbox: data.isAttending,
			},
			IsPlusOneAttending: {
				checkbox: data.isPlusOneAttending,
			},
			MessageToUs: {
				rich_text: [
					{
						type: 'text',
						text: {
							content: data.messageToUs,
						},
					},
				],
			},
			Name: {
				title: [
					{
						type: 'text',
						text: {
							content: data.name,
						},
					},
				],
			},
			Phone: {
				phone_number: data.phone,
			},
			PlusOneName: {
				rich_text: [
					{
						type: 'text',
						text: {
							content: data.plusOneName,
						},
					},
				],
			},
			Tags: {
				multi_select: data.tags.map((tag) => ({ name: tag })),
			},
		},
	}
}

const getPeople = async () => {
	const results: Result[] = []

	let query = await notionClient.databases.query({
		database_id: process.env.NOTION_GUEST_DB_ID,
	})
	results.push(...(query.results as Result[]))

	while (query.has_more) {
		query = await notionClient.databases.query({
			database_id: process.env.NOTION_GUEST_DB_ID,
			start_cursor: query.next_cursor,
		})
		results.push(...(query.results as Result[]))
	}

	return convertToNotionUsers(results)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case 'GET': {
			res.json(await getPeople())
			break
		}
		case 'PUT': {
			const user = req.body.data as NotionUser
			res.json(await notionClient.pages.update(convertFromNotionUser(user)))
			break
		}
	}
}

export default withSessionRoute(handler)
