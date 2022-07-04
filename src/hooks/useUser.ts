import { IronSessionOptions } from 'iron-session'
import Router from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

export type User = {
	isLoggedIn: boolean
}

export default function useUser({ redirectTo = '', redirectIfLoggedIn = false } = {}) {
	const { data: user, mutate: mutateUser } = useSWR<User>('/api/user')

	useEffect(() => {
		if (!redirectTo || !user) return

		if ((redirectTo && !redirectIfLoggedIn && !user?.isLoggedIn) || (redirectIfLoggedIn && user?.isLoggedIn)) {
			Router.push(redirectTo)
		}
	}, [user, redirectTo, redirectIfLoggedIn])

	return { user, mutateUser }
}

export const sessionOptions: IronSessionOptions = {
	password: process.env.IRON_SESSION_COOKIE_PW,
	cookieName: 'trenary.netlify.app',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
}

declare module 'iron-session' {
	interface IronSessionData {
		user?: User
	}
}
