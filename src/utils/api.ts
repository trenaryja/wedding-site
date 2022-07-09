import { NextApiRequest, NextApiResponse } from 'next'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'

export type User = {
	isLoggedIn: boolean
	isAdmin: boolean
	phone?: string
	otp?: string
}

export const defaultUser: User = {
	isLoggedIn: false,
	isAdmin: false,
}

export const updateUser = async (req: NextApiRequest, res: NextApiResponse, user: User) => {
	req.session.user = user
	await req.session.save()
	res.json(user)
}

export const fetchJson = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
	const response = await fetch(input, init)
	const data = await response.json()
	if (response.ok) return data as T
	throw new Error(data.message || response.statusText || 'Unexpected error')
}

const jsonRequestHeaders = { 'Content-Type': 'application/json' }

export const login = async (password: string, useHerPhoneNumber: boolean) => {
	const user = await fetchJson<User>('/api/login', {
		body: JSON.stringify({ password, useHerPhoneNumber }),
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

export const sendOtp = async (to: string) => {
	const user = await fetchJson<User>('/api/sendOtp', {
		method: 'POST',
		headers: jsonRequestHeaders,
		body: JSON.stringify({ to }),
	})
	return user
}

export const validateOtp = async (otp: string) => {
	const user = await fetchJson<User>('/api/validateOtp', {
		method: 'POST',
		headers: jsonRequestHeaders,
		body: JSON.stringify({ otp }),
	})
	return user
}
