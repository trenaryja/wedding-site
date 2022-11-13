import { PrismaClient, User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from '../../../utils'
const prisma = new PrismaClient()

const _create = async (data: User) => await prisma.user.create({ data })
const _read = async (id: number) => await prisma.user.findUnique({ where: { id } })
const _update = async (id: number, data: User) => await prisma.user.update({ where: { id }, data })
const _delete = async (id: number) => await prisma.user.delete({ where: { id } })

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (['POST', 'DELETE'].includes(req.method) && !req.session.data?.isAdmin) {
		res.status(403).json({ message: 'You are not an admin, stop it' } as Error)
		return
	}

	switch (req.method) {
		case 'POST': {
			res.json(await _create(req.body.data as User))
			break
		}
		case 'GET': {
			res.json(await _read(parseInt(req.query.id as string)))
			break
		}
		case 'PUT': {
			res.json(await _update(parseInt(req.query.id as string), req.body.data as User))
			break
		}
		case 'DELETE': {
			res.json(await _delete(parseInt(req.query.id as string)))
			break
		}
	}
}

export default withSessionRoute(handler)
