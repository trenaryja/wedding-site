import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions, updateUser, User } from '../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse<User | Error>) => {
	const { password, useHerPhoneNumber } = await req.body

	if (password !== process.env.ADMIN_PW) {
		res.status(403).json({ message: 'Invalid password' } as Error)
		return
	}

	const phone = useHerPhoneNumber ? process.env.RACHEL_PHONE_NUMBER : process.env.JUSTIN_PHONE_NUMBER

	const user: User = { isLoggedIn: true, isAdmin: true, phone }
	await updateUser(req, res, user)
}

export default withIronSessionApiRoute(handler, sessionOptions)
