/* eslint-disable @typescript-eslint/no-namespace */
import CryptoJS from 'crypto-js'

export * from './api'
export * from './session'
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
			DATABASE_URL: string
		}
	}
}

export const WEDDING_DATE = new Date('2023-11-18T05:00:00.000Z')
export const BACHELOR_PARTY_DATE = new Date('2023-09-01T05:00:00.000Z')

export const exists = (x: unknown) => x !== undefined && x !== null

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

export const formatPhoneNumber = (value: string) => {
	if (!value) return value
	const numberValue = value.replace(/[^\d]/g, '')

	if (numberValue.length < 4) return numberValue
	if (numberValue.length < 7) return `(${numberValue.slice(0, 3)}) ${numberValue.slice(3)}`
	return `(${numberValue.slice(0, 3)}) ${numberValue.slice(3, 6)}-${numberValue.slice(6, 10)}`
}

export const validateE164PhoneNumber = (value: string) => {
	return /^\+1\d{10}$/.test(value)
}

export const generateOtp = (length = 4) => {
	const dict = '0123456789'
	let OTP = ''
	for (let i = 0; i < length; i++) {
		OTP += dict[Math.floor(Math.random() * dict.length)]
	}
	return OTP
}

export const encrypt = (value: string) => {
	return CryptoJS.AES.encrypt(value, process.env.IRON_SESSION_COOKIE_PW).toString()
}

export const decrypt = (value: string) => {
	return CryptoJS.AES.decrypt(value, process.env.IRON_SESSION_COOKIE_PW).toString(CryptoJS.enc.Utf8)
}

export const stringifyValues = <T>(input: T): { [key in keyof T]: string } => {
	if ([null, undefined].includes(input)) return
	const out: { [key in keyof T]: string } = {} as { [key in keyof T]: string }
	for (const key of Object.keys(input) as (keyof T)[]) {
		out[key] = input[key]?.toString()
	}
	return out
}
