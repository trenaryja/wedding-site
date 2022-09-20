import { NextApiRequest, NextApiResponse } from 'next'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'
import { stringifyValues } from '.'
import { Session } from './types'
export * as db from './db'

export const updateSession = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
	req.session.data = session
	await req.session.save()
	res.json(session)
}

export const fetcher = async <T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> => {
	const response = await fetch(input, init)
	const data = await response.json()
	if (response.ok) return data as T
	throw new Error(data.message || response.statusText || 'Unexpected error')
}

const jsonRequestHeaders = { 'Content-Type': 'application/json' }

export const postJson = async <T>(input: RequestInfo | URL, body?: unknown, init?: RequestInit): Promise<T> => {
	return await fetcher(input, {
		method: 'POST',
		headers: jsonRequestHeaders,
		body: JSON.stringify(body),
		...init,
	})
}

export const getJson = async <T>(input: RequestInfo | URL, params?: unknown, init?: RequestInit): Promise<T> => {
	return await fetcher(`${input}?${new URLSearchParams(stringifyValues(params))}`, {
		method: 'GET',
		headers: jsonRequestHeaders,
		...init,
	})
}

export const putJson = async <T>(
	input: RequestInfo | URL,
	params?: unknown,
	body?: unknown,
	init?: RequestInit,
): Promise<T> => {
	return await fetcher(`${input}?${new URLSearchParams(stringifyValues(params))}`, {
		method: 'PUT',
		headers: jsonRequestHeaders,
		body: JSON.stringify(body),
		...init,
	})
}

export const deleteJson = async <T>(input: RequestInfo | URL, params?: unknown, init?: RequestInit): Promise<T> => {
	return await fetcher(`${input}?${new URLSearchParams(stringifyValues(params))}`, {
		method: 'DELETE',
		headers: jsonRequestHeaders,
		...init,
	})
}

export const login = async (password: string, useHerPhoneNumber: boolean) => {
	return await postJson<Session>('/api/login', { password, useHerPhoneNumber })
}

export const logout = async () => {
	return await deleteJson<Session>('/api/session')
}

export const sendSms = async (to: string, body: string) => {
	return await postJson<MessageInstance>('/api/sendSms', { to, body })
}

export const sendOtp = async (to: string) => {
	return await postJson<Session>('/api/sendOtp', { to })
}

export const validateOtp = async (otp: string) => {
	return await postJson<Session>('/api/validateOtp', { otp })
}

export const getImages = async (albumId: string) => {
	return await getJson<string[]>('/api/gallery', { albumId })
}

export const getMessages = async () => {
	return await getJson<MessageInstance[]>('/api/readSms')
}

export const setSession = async (session: Partial<Session>) => {
	return await postJson<Session>('/api/session', session)
}
