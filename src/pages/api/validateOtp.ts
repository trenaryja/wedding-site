import { decrypt, getSession, notionClient, updateSession } from '@/utils/server'
import { UpdatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { addMinutes, format } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { otp } = req.body
	const session = await getSession(req, res)

	if (!otp) {
		res.status(400).json({ message: 'Missing passcode' } as Error)
		return
	}

	if (!session.data?.otp) {
		res.status(400).json({ message: 'Passcode timed out. Go back and try again' } as Error)
		return
	}

	if (decrypt(session.data.otp) !== otp) {
		res.status(400).json({ message: 'Passcode incorrect. Try again' } as Error)
		return
	}

	session.data.user.properties.LastLogin.date = { start: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") }

	await notionClient.pages.update({
		page_id: session.data.user.id,
		properties: session.data.user.properties as unknown as UpdatePageParameters['properties'],
	})

	const { otp: oldOtp, ...currentSession } = session.data
	const timeout = addMinutes(new Date(), 2).toISOString()
	await updateSession(req, res, { ...currentSession, isLoggedIn: true, timeout })
}

export default handler
