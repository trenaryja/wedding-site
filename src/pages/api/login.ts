import { env } from '@/env'
import type { Session } from '@/utils'
import { getNotionUsers, updateSession } from '@/utils/server'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { password, useHerPhoneNumber } = await req.body

	if (password !== env.ADMIN_PW) {
		res.status(403).json({ message: 'Invalid password' })
		return
	}

	const phone = useHerPhoneNumber ? env.RACHEL_PHONE_NUMBER : env.JUSTIN_PHONE_NUMBER
	const user = (await getNotionUsers()).find((u) => u.properties?.Phone?.phone_number === phone)
	const session: Session = { isLoggedIn: true, isAdmin: true, user }
	await updateSession(req, res, session)
}

export default handler
