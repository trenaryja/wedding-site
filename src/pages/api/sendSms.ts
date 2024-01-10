import { twilioClient, twilioPhoneNumber, validateE164PhoneNumber, withSessionRoute } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'

const handler = async (req: NextApiRequest, res: NextApiResponse<MessageInstance | Error>) => {
	const { to, body } = req.body
	const formattedTo = `+1${to}`

	if (!req.session.data?.isAdmin) {
		res.status(403).json({ message: 'You are not an admin, stop it' } as Error)
		return
	}

	if (!to || !body) {
		res.status(400).json({ message: 'Missing required fields' } as Error)
		return
	}

	if (!validateE164PhoneNumber(formattedTo)) {
		res.status(400).json({ message: 'Not a valid E.164 formatted US phone number' } as Error)
		return
	}

	if (process.env.NODE_ENV !== 'development')
		res.json(await twilioClient.messages.create({ from: twilioPhoneNumber, to: formattedTo, body }))
	res.json(body)
}

export default withSessionRoute(handler)
