import { env } from '@/env'
import { getSession, parseBody, twilioClient, validateE164PhoneNumber } from '@/utils/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const bodySchema = z.object({ to: z.string(), body: z.string() })

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession(req, res)

	if (!session.data?.isAdmin) {
		res.status(403).json({ message: 'You are not an admin, stop it' })
		return
	}

	const request = parseBody(bodySchema, req, res)
	if (!request) return
	const { to, body } = request
	if (!to || !body) {
		res.status(400).json({ message: 'Missing required fields' })
		return
	}

	const formattedTo = `+1${to}`
	if (!validateE164PhoneNumber(formattedTo)) {
		res.status(400).json({ message: 'Not a valid E.164 formatted US phone number' })
		return
	}

	if (env.NODE_ENV === 'development') res.json(body)
	else res.json(await twilioClient.messages.create({ from: env.TWILIO_PHONE_NUMBER, to: formattedTo, body }))
}

export default handler
