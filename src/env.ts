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
	// No client vars yet, so this stays empty. Next replaces `process.env.NEXT_PUBLIC_*` by literal
	// text match at build time, so any client var added above must also be listed here verbatim.
	// Server vars are read from `process.env` at runtime and need no mapping — Next stopped
	// static-analyzing them in 13.4.4.
	experimental__runtimeEnv: {},
	emptyStringAsUndefined: true, // a set-but-blank var reads as missing, not ''
	skipValidation: !!process.env.SKIP_ENV_VALIDATION, // escape hatch for lint/typecheck-only CI
})
