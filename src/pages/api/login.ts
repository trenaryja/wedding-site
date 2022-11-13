import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session, updateSession, withSessionRoute } from '../../utils'
const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse<Session | Error>) => {
	const { password, useHerPhoneNumber } = await req.body

	if (password !== process.env.ADMIN_PW) {
		res.status(403).json({ message: 'Invalid password' } as Error)
		return
	}

	const phone = useHerPhoneNumber ? process.env.RACHEL_PHONE_NUMBER : process.env.JUSTIN_PHONE_NUMBER
	const user = await prisma.user.findUnique({ where: { phone } })
	const session: Session = { isLoggedIn: true, isAdmin: true, user }
	await updateSession(req, res, session)
}

export default withSessionRoute(handler)
