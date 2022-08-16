import { Button, Spinner, VStack } from '@chakra-ui/react'
import Conversation from '../../components/Conversation'
import SmsForm from '../../components/SmsForm'
import UserGrid from '../../components/UserGrid'
import useSession from '../../hooks/useSession'
import { logout } from '../../utils'

export default function Index() {
	const { session, mutateSession } = useSession({
		redirectTo: '/admin/login',
		redirectIfNotAdmin: true,
	})

	if (!session || !session.isAdmin) return <Spinner />

	const handleLogout = async () => await mutateSession(await logout())

	return (
		<VStack w='100%'>
			<Conversation />
			<SmsForm />
			<UserGrid />
			<Button onClick={handleLogout}>Logout</Button>
		</VStack>
	)
}
