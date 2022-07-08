import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions, User } from '../../hooks/useUser'

const logoutRoute = (req: NextApiRequest, res: NextApiResponse<User>) => {
	req.session.destroy()
	res.json({ isLoggedIn: false })
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions)
