import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'
import { User } from '../hooks/useUser'

export const fetchJson = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
	const response = await fetch(input, init)
	const data = await response.json()
	if (response.ok) return data as T
	throw new Error(data.message || response.statusText || 'Unexpected error')
}

const jsonRequestHeaders = { 'Content-Type': 'application/json' }

export const login = async (password: string) => {
	const user = await fetchJson<User>('/api/login', {
		body: JSON.stringify({ password }),
		method: 'POST',
		headers: jsonRequestHeaders,
	})
	return user
}

export const logout = async () => {
	const user = await fetchJson<User>('/api/logout')
	return user
}

export const sendSms = async (to: string, body: string) => {
	const message = await fetchJson<MessageInstance>('/api/sendSms', {
		method: 'POST',
		headers: jsonRequestHeaders,
		body: JSON.stringify({ to, body }),
	})
	return message
}
