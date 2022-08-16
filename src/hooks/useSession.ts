import Router from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'
import { Session } from '../utils'

export default function useSession({
	redirectTo = '',
	redirectIfNotLoggedIn = false,
	redirectIfLoggedIn = false,
	redirectIfNotAdmin = false,
	redirectIfAdmin = false,
} = {}) {
	const { data: session, mutate: mutateSession } = useSWR<Session>('/api/session')

	useEffect(() => {
		if (!redirectTo || !session) return

		const contradictions = [redirectIfLoggedIn && redirectIfNotLoggedIn, redirectIfAdmin && redirectIfNotAdmin]

		if (contradictions.some(Boolean)) {
			throw new Error('useSession: contradictory redirect conditions detected')
		}

		const anyReasonToRedirect = [
			redirectIfNotLoggedIn && !session.isLoggedIn,
			redirectIfLoggedIn && session.isLoggedIn,
			redirectIfNotAdmin && !session.isAdmin,
			redirectIfAdmin && session.isAdmin,
		]

		if (anyReasonToRedirect.some(Boolean)) {
			Router.push(redirectTo)
		}
	}, [session, redirectTo, redirectIfLoggedIn, redirectIfAdmin, redirectIfNotLoggedIn, redirectIfNotAdmin])

	return { session, mutateSession }
}
