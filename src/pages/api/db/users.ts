import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from '../../../utils'
export const prisma = new PrismaClient()

const getUsers = async () => await prisma.user.findMany()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	res.json(await getUsers())
}

export default withSessionRoute(handler)
