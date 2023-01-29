import { NextApiRequest, NextApiResponse } from 'next'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'
import { validateE164PhoneNumber, withSessionRoute } from '../../utils'
import { twilioClient, twilioPhoneNumber } from '../../utils/twilio'

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

	const message = await twilioClient.messages.create({ from: twilioPhoneNumber, to: formattedTo, body })
	res.json(message)
}

export default withSessionRoute(handler)
