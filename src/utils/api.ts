import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'
import { User } from '../hooks/useUser'

export const fetchJson = async (input: RequestInfo, init?: RequestInit): Promise<unknown> => {
	const response = await fetch(input, init)
	const data = await response.json()
	if (response.ok) return data
	throw new Error(data.message || response.statusText || 'Unexpected error')
}

export const login = async (password) => {
	const user = await fetchJson('/api/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ password }),
	})
	return user as User
}

export const logout = async () => {
	const user = await fetchJson('/api/logout', { method: 'POST' })
	return user as User
}

export const sendSms = async (to: string, body: string) => {
	const message = await fetchJson('/api/sendSms', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ to, body }),
	})
	return message as MessageInstance
}
