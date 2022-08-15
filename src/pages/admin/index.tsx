import { Button, Spinner, VStack } from '@chakra-ui/react'
import Conversation from '../../components/Conversation'
import SmsForm from '../../components/SmsForm'
import UserGrid from '../../components/UserGrid'
import useUser from '../../hooks/useUser'
import { logout } from '../../utils'

export default function Index() {
	const { user, mutateUser } = useUser({
		redirectTo: '/admin/login',
		redirectIfNotAdmin: true,
	})

	if (!user || !user.isAdmin) return <Spinner />

	const handleLogout = async () => await mutateUser(await logout())

	return (
		<VStack w='100%'>
			<Conversation />
			<SmsForm />
			<UserGrid />
			<Button onClick={handleLogout}>Logout</Button>
		</VStack>
	)
}
