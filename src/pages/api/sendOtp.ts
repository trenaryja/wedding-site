import { Session } from '@/utils'
import {
	defaultSession,
	encrypt,
	generateOtp,
	getNotionUsers,
	getSession,
	twilioClient,
	updateSession,
	validateE164PhoneNumber,
} from '@/utils/server'
import { addMinutes } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { to } = req.body
	const formattedTo = `+1${to}`

	if (!to) {
		res.status(400).json({ message: 'Missing phone number' } as Error)
		return
	}

	if (!validateE164PhoneNumber(formattedTo)) {
		res.status(400).json({ message: 'Not a valid E.164 formatted US phone number' } as Error)
		return
	}

	const user = (await getNotionUsers()).find((u) => u.properties.Phone.phone_number === to)

	if (!user) {
		res.status(400).json({ message: 'This phone number did not match anyone on the invite list' } as Error)
		return
	}

	const otp = generateOtp()
	console.log('OTP:', otp)

	const body = `Your One-Time Passcode (OTP) is: ${otp}`
	if (process.env.NODE_ENV !== 'development')
		await twilioClient.messages.create({ from: process.env.TWILIO_PHONE_NUMBER, to: formattedTo, body })

	const timeout = addMinutes(new Date(), 2).toISOString()
	const currentSession = (await getSession(req, res)).data || defaultSession
	const session: Session = {
		...currentSession,
		otp: encrypt(otp),
		user,
		timeout,
	}

	await updateSession(req, res, session)
}

export default handler
