import { notionUserSchema } from '@/utils'
import { defaultSession, getNotionUsers, getSession, parseBody, updateSession } from '@/utils/server'
import { addMinutes } from 'date-fns'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

/** Only the guest is client-settable; isAdmin, isLoggedIn, otp and timeout are granted server-side alone. */
const bodySchema = z.object({ user: notionUserSchema })

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession(req, res)

	if (!req.method) {
		res.status(400).json({ message: 'Missing request method' })
		return
	}

	switch (req.method) {
		case 'GET':
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
				const phone = session.data.user.properties.Phone.phone_number
				const user = (await getNotionUsers()).find((u) => u.properties.Phone.phone_number === phone)
				const timeout = addMinutes(new Date(), 2).toISOString()
				await updateSession(req, res, { ...session.data, user, timeout })
				return
			}

			res.json(defaultSession)
			break
		case 'POST':
		case 'PUT': {
			const body = parseBody(bodySchema, req, res)
			if (!body) return
			const currentSession = session.data ?? defaultSession
			if (!currentSession.isAdmin && body.user.id !== currentSession.user?.id) {
				res.status(403).json({ message: 'Only an admin can switch to another guest' })
				return
			}
			await updateSession(req, res, { ...currentSession, user: body.user })
			break
		}
		case 'DELETE':
			session.destroy()
			res.json(defaultSession)
			break
		default:
			res.setHeader('Allow', 'GET, POST, PUT, DELETE')
			res.status(405).json({ message: 'Method Not Allowed' })
	}
}

export default handler
