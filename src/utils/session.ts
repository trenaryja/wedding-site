import { IronSessionOptions } from 'iron-session'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiHandler } from 'next'
import { User } from './types'

declare module 'iron-session' {
	interface IronSessionData {
		user?: User
	}
}

export const sessionOptions: IronSessionOptions = {
	password: process.env.IRON_SESSION_COOKIE_PW,
	cookieName: 'trenary.netlify.app',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
}

export const withSessionRoute = (handler: NextApiHandler) => withIronSessionApiRoute(handler, sessionOptions)
