import { notionUserSchema, parseOrThrow } from '@/utils'
import { getSession, notionClient, parseBody, updateSession } from '@/utils/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

/** Notion caps one rich_text item at 2000 characters. */
const bodySchema = z.object({ message: z.string().max(2000) })

/** A guest's only write: their own MessageToUs, on the guest the session already holds. */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession(req, res)
	const user = session.data?.isLoggedIn ? session.data.user : undefined
	if (!session.data || !user) {
		res.status(403).json({ message: 'Log in to leave us a message' })
		return
	}

	const body = parseBody(bodySchema, req, res)
	if (!body) return

	const page = await notionClient.pages.update({
		page_id: user.id,
		properties: { MessageToUs: { rich_text: [{ text: { content: body.message } }] } },
	})
	await updateSession(req, res, {
		...session.data,
		user: parseOrThrow(notionUserSchema, page, 'the Notion page update'),
	})
}

export default handler
