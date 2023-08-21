import { addMinutes } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session, defaultSession, updateSession, withSessionRoute } from '../../utils'
import { getNotionUsers } from './notion'

const handler = async (req: NextApiRequest, res: NextApiResponse<Session | Error>) => {
	switch (req.method) {
		case 'GET': {
			if (req.session.data) {
				const session = req.session.data
				if (session.timeout && Date.parse(session.timeout) >= Date.now()) {
					res.json(req.session.data)
					return
				}

				if (!session.user) {
					res.json(defaultSession)
					return
				}

				console.log('User data is stale, refreshing')
				const phone = session.user?.properties.Phone.phone_number
				const user = (await getNotionUsers()).find((u) => u.properties.Phone.phone_number === phone)
				const timeout = addMinutes(new Date(), 1).toISOString()
				await updateSession(req, res, { ...session, user, timeout })
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
