import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions, User } from '../../hooks/useUser'

const userRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
	if (!!req.session.user) {
		res.json(req.session.user)
		return
	}
	res.json({
		isLoggedIn: false,
	})
}

export default withIronSessionApiRoute(userRoute, sessionOptions)
