import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { decrypt, sessionOptions, updateUser, User } from '../../utils'

const sendOtpRoute = async (req: NextApiRequest, res: NextApiResponse<User | Error>) => {
	const { otp } = req.body

	if (!otp) {
		res.status(400).json({ message: 'Missing passcode' } as Error)
		return
	}

	if (!req.session.user?.otp) {
		res.status(400).json({ message: 'Passcode timed out. Go back and try again' } as Error)
		return
	}

	if (decrypt(req.session.user.otp) !== otp) {
		res.status(400).json({ message: 'Passcode incorrect. Try again' } as Error)
		return
	}

	const { otp: oldOtp, ...currentUser } = req.session.user
	const user = { ...currentUser, isLoggedIn: true }
	await updateUser(req, res, user)
}

export default withIronSessionApiRoute(sendOtpRoute, sessionOptions)
