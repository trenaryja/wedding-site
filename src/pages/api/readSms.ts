import { NextApiRequest, NextApiResponse } from 'next'

import { twilioClient, withSessionRoute } from '@/utils'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'

const handler = async (req: NextApiRequest, res: NextApiResponse<MessageInstance[] | Error>) => {
	if (!req.session.data?.isAdmin) {
		res.status(403).json({ message: 'You are not an admin, stop it' } as Error)
		return
	}

	const messages = await twilioClient.messages.list()
	res.json(messages)
}

export default withSessionRoute(handler)
