import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions, User } from '../../hooks/useUser'

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
	if (req.session.user) {
		res.json({
			isLoggedIn: true,
		})
	} else {
		res.json({
			isLoggedIn: false,
		})
	}
}

export default withIronSessionApiRoute(userRoute, sessionOptions)
