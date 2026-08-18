import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

// Validated at boot — a missing secret throws here with a named message, not `undefined` mid-request.
// All server-only; nothing crosses to the browser bundle. No NEXT_PUBLIC_* yet, so `client` stays empty.
export const env = createEnv({
	server: {
		IRON_SESSION_COOKIE_PW: z.string().min(32),
		ADMIN_PW: z.string().min(1),
		TWILIO_ACCOUNT_SID: z.string().min(1),
		TWILIO_AUTH_TOKEN: z.string().min(1),
		TWILIO_PHONE_NUMBER: z.string().min(1),
		RACHEL_PHONE_NUMBER: z.string().min(1),
		JUSTIN_PHONE_NUMBER: z.string().min(1),
		NOTION_TOKEN: z.string().min(1),
		NOTION_GUEST_DB_ID: z.string().min(1),
		CLOUDINARY_API_KEY: z.string().min(1),
		CLOUDINARY_API_SECRET: z.string().min(1),
		CLOUDINARY_API_CLOUD_NAME: z.string().min(1),
	},
	// Mapped explicitly rather than `process.env`: @types/node's ProcessEnv has no index
	// signature, so the shortcut doesn't typecheck — and Next only inlines vars named here.
	runtimeEnv: {
		IRON_SESSION_COOKIE_PW: process.env.IRON_SESSION_COOKIE_PW,
		ADMIN_PW: process.env.ADMIN_PW,
		TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
		TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
		TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
		RACHEL_PHONE_NUMBER: process.env.RACHEL_PHONE_NUMBER,
		JUSTIN_PHONE_NUMBER: process.env.JUSTIN_PHONE_NUMBER,
		NOTION_TOKEN: process.env.NOTION_TOKEN,
		NOTION_GUEST_DB_ID: process.env.NOTION_GUEST_DB_ID,
		CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
		CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
		CLOUDINARY_API_CLOUD_NAME: process.env.CLOUDINARY_API_CLOUD_NAME,
	},
	emptyStringAsUndefined: true, // a set-but-blank var reads as missing, not ''
	skipValidation: !!process.env.SKIP_ENV_VALIDATION, // escape hatch for lint/typecheck-only CI
})
