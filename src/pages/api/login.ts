import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions, User } from '../../hooks/useUser'

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
	const { password } = await req.body

	if (password !== process.env.ADMIN_PW) {
		res.status(403).json({ message: 'Invalid password' })
		return
	}

	const user = { isLoggedIn: true } as User
	req.session.user = user
	await req.session.save()
	res.json(user)
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)
