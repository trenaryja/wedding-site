import { Session } from '@/utils'
import { decrypt, notionClient, updateSession, withSessionRoute } from '@/utils/server'
import { UpdatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { addMinutes, format } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse<Session | Error>) => {
	const { otp } = req.body

	if (!otp) {
		res.status(400).json({ message: 'Missing passcode' } as Error)
		return
	}

	if (!req.session.data?.otp) {
		res.status(400).json({ message: 'Passcode timed out. Go back and try again' } as Error)
		return
	}

	if (decrypt(req.session.data.otp) !== otp) {
		res.status(400).json({ message: 'Passcode incorrect. Try again' } as Error)
		return
	}

	req.session.data.user.properties.LastLogin.date = { start: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") }

	await notionClient.pages.update({
		page_id: req.session.data.user.id,
		properties: req.session.data.user.properties as unknown as UpdatePageParameters['properties'],
	})

	const { otp: oldOtp, ...currentSession } = req.session.data
	const timeout = addMinutes(new Date(), 2).toISOString()
	const session: Session = { ...currentSession, isLoggedIn: true, timeout }
	await updateSession(req, res, session)
}

export default withSessionRoute(handler)
