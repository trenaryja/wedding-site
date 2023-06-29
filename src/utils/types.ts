import { NotionUser } from './notion'

export type HttpRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT'

export interface Session {
	isLoggedIn: boolean
	isAdmin: boolean
	otp?: string
	user?: NotionUser
}

export const defaultSession: Session = {
	isLoggedIn: false,
	isAdmin: false,
}
