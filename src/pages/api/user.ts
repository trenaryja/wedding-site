import { NextApiRequest, NextApiResponse } from 'next'
import { defaultUser, User, withSessionRoute } from '../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
	if (!!req.session.user) {
		res.json(req.session.user)
		return
	}
	res.json(defaultUser)
}

export default withSessionRoute(handler)
