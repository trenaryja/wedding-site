import { NextApiRequest, NextApiResponse } from 'next'
import {
	defaultSession,
	encrypt,
	generateOtp,
	Session,
	updateSession,
	validateE164PhoneNumber,
	withSessionRoute,
} from '../../utils'
import { twilioClient, twilioPhoneNumber } from '../../utils/twilio'

const handler = async (req: NextApiRequest, res: NextApiResponse<Session | Error>) => {
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

	// TODO: Lookup phone number in database to get additional user info. If no user, send error
	if (![process.env.RACHEL_PHONE_NUMBER, process.env.JUSTIN_PHONE_NUMBER].includes(to)) {
		res.status(400).json({ message: 'Not a recognized phone number' } as Error)
		return
	}

	const otp = generateOtp()
	console.log('OTP:', otp)

	const body = `Your One-Time Passcode (OTP) is: ${otp}`
	await twilioClient.messages.create({ from: twilioPhoneNumber, to: formattedTo, body })

	const currentSession = req.session.data || defaultSession
	const session: Session = { ...currentSession, otp: encrypt(otp), user: { ...currentSession.user, phone: to } }
	await updateSession(req, res, session)
}

export default withSessionRoute(handler)
