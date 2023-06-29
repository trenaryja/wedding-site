import { NextApiRequest, NextApiResponse } from 'next'
import { Session, decrypt, updateSession, withSessionRoute } from '../../utils'
import { updateNotionUser } from './notion'

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

	req.session.data.user.properties.LastLogin.date = { start: new Date().toISOString() }
	await updateNotionUser(req.session.data.user)

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { otp: oldOtp, ...currentSession } = req.session.data
	const session: Session = { ...currentSession, isLoggedIn: true }
	await updateSession(req, res, session)
}

export default withSessionRoute(handler)
