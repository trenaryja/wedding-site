import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from '../../utils'
import { twilioClient, twilioPhoneNumber } from '../../utils/twilio'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (!req.session.user?.isAdmin) {
		res.status(403).json({ message: 'You are not an admin, stop it' } as Error)
		return
	}

	const messages = await twilioClient.messages.list({ to: twilioPhoneNumber })
	res.json(messages)
}

export default withSessionRoute(handler)
