import { getSession, twilioClient } from '@/utils/server'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession(req, res)
	if (!session.data?.isAdmin) {
		res.status(403).json({ message: 'You are not an admin, stop it' } as Error)
		return
	}

	const messages = await twilioClient.messages.list()
	res.json(messages)
}

export default handler
