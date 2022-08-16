import { NextApiRequest, NextApiResponse } from 'next'
import { defaultSession, Session, withSessionRoute } from '../../utils'

const logoutRoute = (req: NextApiRequest, res: NextApiResponse<Session>) => {
	req.session.destroy()
	res.json(defaultSession)
}

export default withSessionRoute(logoutRoute)
