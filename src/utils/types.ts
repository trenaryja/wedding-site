import { z } from 'zod'
import { notionUserSchema } from './notion'

export const sessionSchema = z.object({
	isLoggedIn: z.boolean(),
	isAdmin: z.boolean(),
	otp: z.string().optional(),
	user: notionUserSchema.optional(),
	timeout: z.string().optional(),
})

export type Session = z.infer<typeof sessionSchema>
