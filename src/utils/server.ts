import { env } from '@/env'
import type { NotionUser, Session } from '@/utils'
import { notionUserSchema, parseOrThrow } from '@/utils'
import { Client } from '@notionhq/client'
import crypto from 'crypto'
import type { SessionOptions } from 'iron-session'
import { getIronSession } from 'iron-session'
import type { NextApiRequest, NextApiResponse } from 'next'
import twilio from 'twilio'
import { z } from 'zod'

const sessionOptions: SessionOptions = {
	password: env.IRON_SESSION_COOKIE_PW,
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
	await getIronSession<{ data?: Session }>(req, res, sessionOptions)

export const updateSession = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
	const currentSession = await getSession(req, res)
	currentSession.data = session
	await currentSession.save()
	res.json(session)
}

/** On a mismatch this already sent the 400, so callers just return on undefined. */
export const parseBody = <T extends z.ZodType>(schema: T, req: NextApiRequest, res: NextApiResponse) => {
	const result = schema.safeParse(req.body)
	if (result.success) return result.data
	res.status(400).json({ message: `Invalid request body: ${z.prettifyError(result.error)}` })
}

export const notionClient = new Client({ auth: env.NOTION_TOKEN })

export const twilioClient = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN)

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

export const getNotionUsers = async () => {
	const users: NotionUser[] = []
	let cursor: string | undefined
	do {
		const query = await notionClient.dataSources.query({ data_source_id: env.NOTION_GUEST_DB_ID, start_cursor: cursor })
		users.push(...parseOrThrow(z.array(notionUserSchema), query.results, 'the Notion guest list'))
		cursor = query.next_cursor ?? undefined
	} while (cursor)

	return users.sort((a, b) =>
		(a.properties.Name.title[0]?.text.content ?? '').localeCompare(b.properties.Name.title[0]?.text.content ?? ''),
	)
}

const encryptionParams = ['aes-256-ecb', env.IRON_SESSION_COOKIE_PW, null] as const

export const encrypt = (text: string) => {
	const cipher = crypto.createCipheriv(...encryptionParams)
	return cipher.update(text, 'utf-8', 'hex') + cipher.final('hex')
}

export const decrypt = (encryptedText: string) => {
	const decipher = crypto.createDecipheriv(...encryptionParams)
	return decipher.update(encryptedText, 'hex', 'utf-8') + decipher.final('utf-8')
}
