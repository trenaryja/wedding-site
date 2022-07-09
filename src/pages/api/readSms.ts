import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'
import { sessionOptions } from '../../utils'

const readSmsRoute = async (req: NextApiRequest, res: NextApiResponse) => {
	const accountSid = process.env.TWILIO_ACCOUNT_SID
	const authToken = process.env.TWILIO_AUTH_TOKEN
	const to = process.env.TWILIO_PHONE_NUMBER
	const client = twilio(accountSid, authToken)

	if (!req.session.user?.isAdmin) {
		res.status(403).json({ message: 'You are not an admin, stop it' } as Error)
		return
	}

	const messages = await client.messages.list({ to })
	res.json(messages)
}

export default withIronSessionApiRoute(readSmsRoute, sessionOptions)
