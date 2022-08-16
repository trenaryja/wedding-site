import { Button, Spinner, Text, VStack } from '@chakra-ui/react'
import useSession from '../../hooks/useSession'
import { logout } from '../../utils'

export default function Index() {
	const { session, mutateSession } = useSession({
		redirectTo: '/rsvp/login',
		redirectIfNotLoggedIn: true,
	})

	if (!session || !session.isLoggedIn) return <Spinner />

	const handleLogout = async () => await mutateSession(await logout())

	return (
		<VStack>
			<Text as='pre'>{JSON.stringify(session, null, 2)}</Text>
			<Button onClick={handleLogout}>Logout</Button>
		</VStack>
	)
}
