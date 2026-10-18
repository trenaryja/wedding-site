import { env } from '@/env'
import type { Session } from '@/utils'
import { getNotionUsers, parseBody, updateSession } from '@/utils/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const bodySchema = z.object({ password: z.string(), useHerPhoneNumber: z.boolean() })

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const body = parseBody(bodySchema, req, res)
	if (!body) return
	const { password, useHerPhoneNumber } = body

	if (password !== env.ADMIN_PW) {
		res.status(403).json({ message: 'Invalid password' })
		return
	}

	const phone = useHerPhoneNumber ? env.RACHEL_PHONE_NUMBER : env.JUSTIN_PHONE_NUMBER
	const user = (await getNotionUsers()).find((u) => u.properties.Phone.phone_number === phone)
	const session: Session = { isLoggedIn: true, isAdmin: true, user }
	await updateSession(req, res, session)
}

export default handler
