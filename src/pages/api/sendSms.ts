import { getSession, twilioClient, validateE164PhoneNumber } from '@/utils/server'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { to, body } = req.body
	const formattedTo = `+1${to}`
	const session = await getSession(req, res)

	if (!session.data?.isAdmin) {
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
		res.json(await twilioClient.messages.create({ from: process.env.TWILIO_PHONE_NUMBER, to: formattedTo, body }))
	res.json(body)
}

export default handler
