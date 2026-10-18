import { z } from 'zod'

const richTextSchema = z.array(z.object({ text: z.object({ content: z.string() }), plain_text: z.string().optional() }))
const checkboxSchema = z.object({ checkbox: z.boolean() })
const dateSchema = z.object({ date: z.object({ start: z.string() }).nullable() })

export const notionUserSchema = z.object({
	id: z.string(),
	properties: z.object({
		IsAttending: checkboxSchema,
		IsPlusOneAttending: checkboxSchema,
		IsNotAttending: checkboxSchema,
		MessageToUs: z.object({ rich_text: richTextSchema }),
		Name: z.object({ title: richTextSchema }),
		Phone: z.object({ phone_number: z.string().nullable() }),
		PlusOneName: z.object({ rich_text: richTextSchema }),
		Tags: z.object({ multi_select: z.array(z.object({ name: z.string() })) }),
		LastLogin: dateSchema,
		LastContacted: dateSchema,
		SuitStatus: z.object({ select: z.object({ name: z.string() }).nullable() }),
	}),
})

export type NotionUser = z.infer<typeof notionUserSchema>
export type Properties = NotionUser['properties']

export const SUIT_STATUSES = [
	'Not Started',
	'Booked Fitting',
	'Fitted',
	'Ordered/Paid',
	'Picked Up',
	'Dropped Off',
] as const
