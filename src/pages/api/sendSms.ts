import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'
import { sessionOptions } from '../../hooks/useUser'

const sendSmsRoute = async (req: NextApiRequest, res: NextApiResponse<MessageInstance | Error>) => {
	const accountSid = process.env.TWILIO_ACCOUNT_SID
	const authToken = process.env.TWILIO_AUTH_TOKEN
	const from = process.env.TWILIO_PHONE_NUMBER
	const client = twilio(accountSid, authToken)
	const { to, body } = req.body

	if (!req.session.user?.isLoggedIn) {
		res.status(403).json({ message: 'You are not an admin. Stop it.' } as Error)
		return
	}

	if (true) {
		res.status(400).json({ message: 'Forced Error for Testing' } as Error)
		return
	}

	// const message = await client.messages.create({ to, from, body })
	// res.json(message)
}

export default withIronSessionApiRoute(sendSmsRoute, sessionOptions)
