import { NextApiRequest, NextApiResponse } from 'next'
import {
	Session,
	defaultSession,
	encrypt,
	generateOtp,
	updateSession,
	validateE164PhoneNumber,
	withSessionRoute,
} from '../../utils'
import { twilioClient, twilioPhoneNumber } from '../../utils/twilio'
import { getNotionUsers } from './notion'

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

	// const user = await prisma.user.findUnique({ where: { phone: to } })

	const user = (await getNotionUsers()).find((u) => u.properties.Phone.phone_number === to)

	if (!user) {
		res.status(400).json({ message: 'This phone number did not match anyone on the invite list' } as Error)
		return
	}

	const otp = generateOtp()
	console.log('OTP:', otp)

	const body = `Your One-Time Passcode (OTP) is: ${otp}`
	if (process.env.NODE_ENV !== 'development')
		await twilioClient.messages.create({ from: twilioPhoneNumber, to: formattedTo, body })

	const currentSession = req.session.data || defaultSession
	const session: Session = {
		...currentSession,
		otp: encrypt(otp),
		user: { ...currentSession.user, ...user },
	}
	await updateSession(req, res, session)
}

export default withSessionRoute(handler)
