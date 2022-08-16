import { NextApiRequest, NextApiResponse } from 'next'
import { defaultSession, Session, withSessionRoute } from '../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse<Session>) => {
	if (!!req.session.data) {
		res.json(req.session.data)
		return
	}
	res.json(defaultSession)
}

export default withSessionRoute(handler)
