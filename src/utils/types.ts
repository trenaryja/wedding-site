export type HttpRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT'

export interface User {
	isLoggedIn: boolean
	isAdmin: boolean
	phone?: string
	otp?: string
}

export const defaultUser: User = {
	isLoggedIn: false,
	isAdmin: false,
}
