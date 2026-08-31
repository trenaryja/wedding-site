import { defaultSession, getNotionUsers, getSession, updateSession } from '@/utils/server'
import { addMinutes } from 'date-fns'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession(req, res)

	if (!req.method) {
		res.status(400).json({ message: 'Missing request method' })
		return
	}

	switch (req.method) {
		case 'GET': {
			if (session.data) {
				if (session.data.timeout && Date.parse(session.data.timeout) >= Date.now()) {
					res.json(session.data)
					return
				}

				if (!session.data.user) {
					res.json(defaultSession)
					return
				}

				console.log('User data is stale, refreshing')
				const phone = session.data.user?.properties?.Phone?.phone_number
				const user = (await getNotionUsers()).find((u) => u.properties?.Phone?.phone_number === phone)
				const timeout = addMinutes(new Date(), 2).toISOString()
				await updateSession(req, res, { ...session.data, user, timeout })
				return
			}

			res.json(defaultSession)
			break
		}
		case 'POST':
		case 'PUT': {
			const currentSession = session.data || defaultSession
			await updateSession(req, res, { ...currentSession, ...req.body })
			break
		}
		case 'DELETE': {
			session.destroy()
			res.json(defaultSession)
			break
		}
		default: {
			res.setHeader('Allow', 'GET, POST, PUT, DELETE')
			res.status(405).json({ message: 'Method Not Allowed' })
		}
	}
}

export default handler
