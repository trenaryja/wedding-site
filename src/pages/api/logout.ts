import { NextApiRequest, NextApiResponse } from 'next'
import { defaultUser, User, withSessionRoute } from '../../utils'

const logoutRoute = (req: NextApiRequest, res: NextApiResponse<User>) => {
	req.session.destroy()
	res.json(defaultUser)
}

export default withSessionRoute(logoutRoute)
