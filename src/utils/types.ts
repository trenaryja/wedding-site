import type { NotionUser } from '@/utils'

export type HttpRequestMethod = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE'

export type Session = {
	isLoggedIn: boolean
	isAdmin: boolean
	otp?: string
	user?: NotionUser
	timeout?: string
}

export type CloudinaryImage = {
	asset_id: string
	public_id: string
	format: string
	version: number
	resource_type: string
	type: string
	created_at: string
	bytes: number
	width: number
	height: number
	folder: string
	url: string
	secure_url: string
}
