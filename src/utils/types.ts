import { User } from '@prisma/client'

export type HttpRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT'

export interface Session {
	isLoggedIn: boolean
	isAdmin: boolean
	otp?: string
	user?: User
}

export const defaultSession: Session = {
	isLoggedIn: false,
	isAdmin: false,
}
