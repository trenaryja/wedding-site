import { Session } from '@/utils'
import { Client } from '@notionhq/client'
import { IronSessionOptions } from 'iron-session'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

declare module 'iron-session' {
	interface IronSessionData {
		data?: Session
	}
}

const sessionOptions: IronSessionOptions = {
	password: process.env.IRON_SESSION_COOKIE_PW,
	cookieName: 'trenary.love',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
}

export const updateSession = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
	req.session.data = session
	await req.session.save()
	res.json(session)
}

export const withSessionRoute = (handler: NextApiHandler) => withIronSessionApiRoute(handler, sessionOptions)

export const notionClient = new Client({ auth: process.env.NOTION_TOKEN })

export const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export const validateE164PhoneNumber = (value: string) => {
	return /^\+1\d{10}$/.test(value)
}

export const generateOtp = (length = 4) => {
	const dict = '0123456789'
	let OTP = ''
	for (let i = 0; i < length; i++) {
		OTP += dict[Math.floor(Math.random() * dict.length)]
	}
	return OTP
}

export const encrypt = (value: string) => {
	return CryptoJS.AES.encrypt(value, process.env.IRON_SESSION_COOKIE_PW).toString()
}

export const decrypt = (value: string) => {
	return CryptoJS.AES.decrypt(value, process.env.IRON_SESSION_COOKIE_PW).toString(CryptoJS.enc.Utf8)
}
