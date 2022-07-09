import Router from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'
import { User } from '../utils'

export default function useUser({
	redirectTo = '',
	redirectIfNotLoggedIn = false,
	redirectIfLoggedIn = false,
	redirectIfNotAdmin = false,
	redirectIfAdmin = false,
} = {}) {
	const { data: user, mutate: mutateUser } = useSWR<User>('/api/user')

	useEffect(() => {
		if (!redirectTo || !user) return

		const contradictions = [redirectIfLoggedIn && redirectIfNotLoggedIn, redirectIfAdmin && redirectIfNotAdmin]

		if (contradictions.some(Boolean)) {
			throw new Error('useUser: contradictory redirect conditions detected')
		}

		const anyReasonToRedirect = [
			redirectIfNotLoggedIn && !user.isLoggedIn,
			redirectIfLoggedIn && user.isLoggedIn,
			redirectIfNotAdmin && !user.isAdmin,
			redirectIfAdmin && user.isAdmin,
		]

		if (anyReasonToRedirect.some(Boolean)) {
			Router.push(redirectTo)
		}
	}, [user, redirectTo, redirectIfLoggedIn, redirectIfAdmin, redirectIfNotLoggedIn, redirectIfNotAdmin])

	return { user, mutateUser }
}
