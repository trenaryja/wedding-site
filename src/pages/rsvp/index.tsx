import { Button, Spinner, Text, VStack } from '@chakra-ui/react'
import router from 'next/router'
import useUser from '../../hooks/useUser'
import { logout } from '../../utils'

export default function Index() {
	const { user, mutateUser } = useUser({
		redirectTo: '/rsvp/login',
		redirectIfNotLoggedIn: true,
	})

	if (!user || !user.isLoggedIn) return <Spinner />

	const handleLogout = async () => {
		await mutateUser(await logout())
		router.push('/rsvp/login')
	}

	return (
		<VStack>
			<Text as='pre'>{JSON.stringify(user, null, 2)}</Text>
			<Button onClick={handleLogout}>Logout</Button>
		</VStack>
	)
}
