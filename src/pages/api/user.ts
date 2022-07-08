import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions, User } from '../../hooks/useUser'

const userRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
	res.json({
		isLoggedIn: !!req.session.user,
	})
}

export default withIronSessionApiRoute(userRoute, sessionOptions)
