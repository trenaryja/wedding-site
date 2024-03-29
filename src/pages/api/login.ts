import { Session } from '@/utils'
import { getNotionUsers, updateSession } from '@/utils/server'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { password, useHerPhoneNumber } = await req.body

	if (password !== process.env.ADMIN_PW) {
		res.status(403).json({ message: 'Invalid password' } as Error)
		return
	}

	const phone = useHerPhoneNumber ? process.env.RACHEL_PHONE_NUMBER : process.env.JUSTIN_PHONE_NUMBER
	const user = (await getNotionUsers()).find((u) => u.properties.Phone.phone_number === phone)
	const session: Session = { isLoggedIn: true, isAdmin: true, user }
	await updateSession(req, res, session)
}

export default handler
