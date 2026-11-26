import { env } from '@/env'
import type { Session } from '@/utils'
import {
	defaultSession,
	encrypt,
	generateOtp,
	getNotionUsers,
	parseBody,
	twilioClient,
	updateSession,
	validateE164PhoneNumber,
} from '@/utils/server'
import { addMinutes } from 'date-fns'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const bodySchema = z.object({ to: z.string() })

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const request = parseBody(bodySchema, req, res)
	if (!request) return
	const { to } = request
	if (!to) {
		res.status(400).json({ message: 'Missing phone number' })
		return
	}

	const formattedTo = `+1${to}`
	if (!validateE164PhoneNumber(formattedTo)) {
		res.status(400).json({ message: 'Not a valid E.164 formatted US phone number' })
		return
	}

	const user = (await getNotionUsers()).find((u) => u.properties.Phone.phone_number === to)

	if (!user) {
		res.status(400).json({ message: 'This phone number did not match anyone on the invite list' })
		return
	}

	const otp = generateOtp()
	const body = `Your One-Time Passcode (OTP) is: ${otp}`
	if (env.NODE_ENV === 'development') console.log('OTP:', otp)
	else await twilioClient.messages.create({ from: env.TWILIO_PHONE_NUMBER, to: formattedTo, body })

	const timeout = addMinutes(new Date(), 2).toISOString()
	/** A fresh session, never the current one: spreading it let a logged-in guest become anyone whose phone they knew. */
	const session: Session = { ...defaultSession, otp: encrypt(otp), otpExpires: timeout, user, timeout }
	await updateSession(req, res, session)
}

export default handler
