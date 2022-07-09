import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { defaultUser, sessionOptions, User } from '../../utils'

const logoutRoute = (req: NextApiRequest, res: NextApiResponse<User>) => {
	req.session.destroy()
	res.json(defaultUser)
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions)
