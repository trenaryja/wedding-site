import { NextApiRequest, NextApiResponse } from 'next'
import { defaultSession, Session, updateSession, withSessionRoute } from '../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse<Session | Error>) => {
	if (['POST', 'PUT'].includes(req.method) && !req.session.data?.isAdmin) {
		res.status(403).json({ message: 'You are not an admin, stop it' } as Error)
		return
	}

	switch (req.method) {
		case 'GET': {
			if (req.session.data) {
				res.json(req.session.data)
				return
			}
			res.json(defaultSession)
			break
		}
		case 'POST':
		case 'PUT': {
			const currentSession = req.session.data || defaultSession
			const session: Session = { ...currentSession, ...req.body }
			await updateSession(req, res, session)
			break
		}
		case 'DELETE': {
			req.session.destroy()
			res.json(defaultSession)
			break
		}
	}
}

export default withSessionRoute(handler)
