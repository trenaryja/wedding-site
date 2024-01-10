export * from './api'
export * from './notion'
export * from './theme'
export * from './types'

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			IRON_SESSION_COOKIE_PW: string
			ADMIN_PW: string
			TWILIO_ACCOUNT_SID: string
			TWILIO_AUTH_TOKEN: string
			TWILIO_PHONE_NUMBER: string
			RACHEL_PHONE_NUMBER: string
			JUSTIN_PHONE_NUMBER: string
			NOTION_TOKEN: string
			NOTION_GUEST_DB_ID: string
			CLOUDINARY_API_KEY: string
			CLOUDINARY_API_SECRET: string
			CLOUDINARY_API_CLOUD_NAME: string
		}
	}
}

export const WEDDING_DATE = new Date('2023-11-18T17:00:00.000-05:00')
export const BACHELOR_PARTY_DATE = new Date('2023-09-01T05:00:00-05:00')
export const RACHEL_VENMO = 'https://account.venmo.com/u/rachel-hamilton-23'
export const JUSTIN_VENMO = 'https://account.venmo.com/u/trenaryja'
export const CONTENT_WIDTH = 'min(70ch, calc(100% - 2rem))'
export const FACTORIAL_52 = 80658175170943878571660636856403766975289505440883277824000000000000n

export const padStart = (num: number, length: number, char = '0') => {
	return `${char.repeat(length)}${num}`.slice(-length)
}

export const chunk = <T>(a: Array<T>, n: number) => {
	if (n < 2) return [a]
	const result: T[][] = []
	let i = 0
	if (a.length % n === 0) {
		const size = Math.floor(a.length / n)
		while (i < a.length) result.push(a.slice(i, (i += size)))
		return result
	}
	while (i < a.length) {
		const size = Math.ceil((a.length - i) / n--)
		result.push(a.slice(i, (i += size)))
	}
	return result
}

export const formatPhoneNumber = (value?: string) => {
	if (!value) return value
	const numberValue = value.replace(/[^\d]/g, '')

	if (numberValue.length < 4) return numberValue
	if (numberValue.length < 7) return `(${numberValue.slice(0, 3)}) ${numberValue.slice(3)}`
	return `(${numberValue.slice(0, 3)}) ${numberValue.slice(3, 6)}-${numberValue.slice(6, 10)}`
}

export const stringifyValues = <T>(input: T): { [key in keyof T]: string } => {
	if ([null, undefined].includes(input)) return
	const out: { [key in keyof T]: string } = {} as { [key in keyof T]: string }
	for (const key of Object.keys(input) as (keyof T)[]) {
		out[key] = input[key]?.toString()
	}
	return out
}
