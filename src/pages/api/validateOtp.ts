import { decrypt, getSession, notionClient, updateSession } from '@/utils/server'
import type { UpdatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { addMinutes, format } from 'date-fns'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { otp } = req.body
	const session = await getSession(req, res)

	if (!otp) {
		res.status(400).json({ message: 'Missing passcode' })
		return
	}

	if (!session.data?.otp) {
		res.status(400).json({ message: 'Passcode timed out. Go back and try again' })
		return
	}

	if (decrypt(session.data.otp) !== otp) {
		res.status(400).json({ message: 'Passcode incorrect. Try again' })
		return
	}

	// passing the otp check guarantees sendOtp populated the session user with its Notion properties
	const user = session.data.user!
	user.properties!.LastLogin!.date = { start: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") }

	await notionClient.pages.update({
		page_id: user.id!,
		properties: user.properties as unknown as UpdatePageParameters['properties'],
	})

	const { otp: _oldOtp, ...currentSession } = session.data
	const timeout = addMinutes(new Date(), 2).toISOString()
	await updateSession(req, res, { ...currentSession, isLoggedIn: true, timeout })
}

export default handler
