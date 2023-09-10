import { IronSessionOptions } from 'iron-session'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiHandler } from 'next'
import { Session } from './types'

declare module 'iron-session' {
	interface IronSessionData {
		data?: Session
	}
}

export const sessionOptions: IronSessionOptions = {
	password: process.env.IRON_SESSION_COOKIE_PW,
	cookieName: 'trenary.love',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
}

export const withSessionRoute = (handler: NextApiHandler) => withIronSessionApiRoute(handler, sessionOptions)
