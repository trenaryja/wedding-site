import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'
import { sessionOptions, validateE164PhoneNumber } from '../../utils'

const handler = async (req: NextApiRequest, res: NextApiResponse<MessageInstance | Error>) => {
	const accountSid = process.env.TWILIO_ACCOUNT_SID
	const authToken = process.env.TWILIO_AUTH_TOKEN
	const from = process.env.TWILIO_PHONE_NUMBER
	const client = twilio(accountSid, authToken)
	const { to, body } = req.body

	if (!req.session.user?.isAdmin) {
		res.status(403).json({ message: 'You are not an admin, stop it' } as Error)
		return
	}

	if (!to || !body) {
		res.status(400).json({ message: 'Missing required fields' } as Error)
		return
	}

	if (!validateE164PhoneNumber(to)) {
		res.status(400).json({ message: 'Not a valid E.164 formatted US phone number' } as Error)
		return
	}

	const message = await client.messages.create({ to, from, body })
	res.json(message)
}

export default withIronSessionApiRoute(handler, sessionOptions)
