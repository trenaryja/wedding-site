import { NotionUser, Session } from '@/utils'
import { Client } from '@notionhq/client'
import CryptoJS from 'crypto-js'
import { SessionOptions, getIronSession } from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'

const sessionOptions: SessionOptions = {
	password: process.env.IRON_SESSION_COOKIE_PW,
	cookieName: 'trenary.love',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
}

export const defaultSession: Session = {
	isLoggedIn: false,
	isAdmin: false,
}

export const getSession = async (req: NextApiRequest, res: NextApiResponse) =>
	await getIronSession<{ data: Session }>(req, res, sessionOptions)

export const updateSession = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
	const currentSession = await getSession(req, res)
	currentSession.data = session
	await currentSession.save()
	res.json(currentSession)
}

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

export const getNotionUsers = async () => {
	const results: NotionUser[] = []

	let query = await notionClient.databases.query({
		database_id: process.env.NOTION_GUEST_DB_ID,
	})

	results.push(...(query.results as NotionUser[]))

	while (query.has_more) {
		query = await notionClient.databases.query({
			database_id: process.env.NOTION_GUEST_DB_ID,
			start_cursor: query.next_cursor,
		})
		results.push(...(query.results as NotionUser[]))
	}

	results.sort((a, b) => a.properties.Name.title[0].text.content.localeCompare(b.properties.Name.title[0].text.content))
	return results
}
