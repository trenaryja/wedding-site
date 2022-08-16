import { PrismaClient, User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from '../../../utils'
export const prisma = new PrismaClient()

const _create = async (data: User[]) => await prisma.user.createMany({ data })
const _read = async () => await prisma.user.findMany()
const _update = async (ids: number[], data: Partial<User>) =>
	await prisma.user.updateMany({ where: { id: { in: ids } }, data })
const _delete = async (ids: number[]) => await prisma.user.deleteMany({ where: { id: { in: ids } } })

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (['POST', 'DELETE', 'PUT'].includes(req.method) && !req.session.data?.isAdmin) {
		res.status(403).json({ message: 'You are not an admin, stop it' } as Error)
		return
	}

	switch (req.method) {
		case 'POST': {
			res.json(await _create(req.body.data as User[]))
			break
		}
		case 'GET': {
			res.json(await _read())
			break
		}
		case 'PUT': {
			res.json(await _update((req.query.ids as string).split(',').map(parseInt), req.body.data as Partial<User>))
			break
		}
		case 'DELETE': {
			res.json(await _delete((req.query.ids as string).split(',').map(parseInt)))
			break
		}
	}
}

export default withSessionRoute(handler)
