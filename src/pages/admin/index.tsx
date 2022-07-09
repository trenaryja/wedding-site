import { Button, Spinner, VStack } from '@chakra-ui/react'
import router from 'next/router'
import SmsForm from '../../components/SmsForm'
import useUser from '../../hooks/useUser'
import { logout } from '../../utils'

export default function Index() {
	const { user, mutateUser } = useUser({
		redirectTo: '/admin/login',
		redirectIfNotAdmin: true,
	})

	if (!user || !user.isAdmin) return <Spinner />

	const handleLogout = async () => {
		await mutateUser(await logout())
		router.push('/admin/login')
	}

	return (
		<VStack>
			<SmsForm />
			<Button onClick={handleLogout}>Logout</Button>
		</VStack>
	)
}
