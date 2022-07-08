export * from './api'
export * from './theme'

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			IRON_SESSION_COOKIE_PW: string
			ADMIN_PW: string
			TWILIO_ACCOUNT_SID: string
			TWILIO_AUTH_TOKEN: string
			TWILIO_PHONE_NUMBER: string
		}
	}
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

export const formatPhoneNumber = (value: string) => {
	if (!value) return value
	const numberValue = value.replace(/[^\d]/g, '')

	if (numberValue.length < 4) return numberValue
	if (numberValue.length < 7) return `(${numberValue.slice(0, 3)}) ${numberValue.slice(3)}`
	return `(${numberValue.slice(0, 3)}) ${numberValue.slice(3, 6)}-${numberValue.slice(6, 10)}`
}
