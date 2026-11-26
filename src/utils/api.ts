import { z } from 'zod'
import type { NotionUser } from './notion'
import { notionUserSchema } from './notion'
import { sessionSchema } from './types'

export const parseOrThrow = <T extends z.ZodType>(schema: T, data: unknown, source: string) => {
	const result = schema.safeParse(data)
	if (!result.success) throw new Error(`Unexpected data from ${source}: ${z.prettifyError(result.error)}`)
	return result.data
}

const errorSchema = z.object({ message: z.string() })

type JsonRequest = { method?: 'DELETE' | 'GET' | 'POST' | 'PUT'; body?: unknown; signal?: AbortSignal }

const fetchJson = async <T extends z.ZodType>(schema: T, input: string, { method, body, signal }: JsonRequest = {}) => {
	const response = await fetch(input, {
		method,
		signal,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	})
	const data: unknown = await response.json()
	if (!response.ok) throw new Error(errorSchema.safeParse(data).data?.message ?? response.statusText)
	return parseOrThrow(schema, data, input)
}

const messageSchema = z.object({
	sid: z.string(),
	direction: z.string(),
	from: z.string(),
	to: z.string(),
	body: z.string(),
})

export type Message = z.infer<typeof messageSchema>

const photoSchema = z.object({ width: z.number(), height: z.number(), url: z.string() })

export type Photo = z.infer<typeof photoSchema>

export const login = async (password: string, useHerPhoneNumber: boolean) =>
	await fetchJson(sessionSchema, '/api/login', { method: 'POST', body: { password, useHerPhoneNumber } })

export const getSession = async () => await fetchJson(sessionSchema, '/api/session')

export const setSessionUser = async (user: NotionUser) =>
	await fetchJson(sessionSchema, '/api/session', { method: 'POST', body: { user } })

export const logout = async () => await fetchJson(sessionSchema, '/api/session', { method: 'DELETE' })

export const sendSms = async (to: string, body: string) =>
	await fetchJson(z.unknown(), '/api/sendSms', { method: 'POST', body: { to, body } })

export const sendOtp = async (to: string) =>
	await fetchJson(sessionSchema, '/api/sendOtp', { method: 'POST', body: { to } })

export const validateOtp = async (otp: string) =>
	await fetchJson(sessionSchema, '/api/validateOtp', { method: 'POST', body: { otp } })

export const getImages = async (albumId: string) =>
	await fetchJson(z.array(z.string()), `/api/gallery?${new URLSearchParams({ albumId })}`)

export const getMessages = async () => await fetchJson(z.array(messageSchema), '/api/readSms')

export const getPhotos = async (signal: AbortSignal) =>
	await fetchJson(z.array(photoSchema), '/api/cloudinary', { signal })

export const getNotionUsers = async () => await fetchJson(z.array(notionUserSchema), '/api/notion')

export const updateMessage = async (message: string) =>
	await fetchJson(sessionSchema, '/api/message', { method: 'PUT', body: { message } })

export const updateNotionUser = async (user: NotionUser) =>
	await fetchJson(notionUserSchema, '/api/notion', { method: 'PUT', body: { data: user } })
