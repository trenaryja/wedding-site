import { NextApiRequest, NextApiResponse } from 'next'
import { Session, updateSession, withSessionRoute } from '../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse<Session | Error>) => {
	const { password, useHerPhoneNumber } = await req.body

	if (password !== process.env.ADMIN_PW) {
		res.status(403).json({ message: 'Invalid password' } as Error)
		return
	}

	const phone = useHerPhoneNumber ? process.env.RACHEL_PHONE_NUMBER : process.env.JUSTIN_PHONE_NUMBER

	// TODO: Lookup phone number in database to get additional user info. If no user, send error

	const session: Session = { isLoggedIn: true, isAdmin: true, user: { phone } }
	await updateSession(req, res, session)
}

export default withSessionRoute(handler)
