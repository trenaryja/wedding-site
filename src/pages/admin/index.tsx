import { Button, Flex, Spinner } from '@chakra-ui/react'
import router from 'next/router'
import SmsForm from '../../components/SmsForm'
import useUser from '../../hooks/useUser'
import { logout } from '../../utils'

export default function Index() {
	const { user, mutateUser } = useUser({
		redirectTo: '/admin/login',
	})

	if (!user || !user.isLoggedIn)
		return (
			<Flex flexDir='column' justifyContent='center' alignItems='center'>
				<Spinner />
			</Flex>
		)

	const handleLogout = async () => {
		const user = logout()
		mutateUser(user)
		router.push('/admin/login')
	}

	return (
		<Flex flexDir='column' justifyContent='center' alignItems='center' gap={5}>
			<SmsForm />
			<Button onClick={handleLogout}>Logout</Button>
		</Flex>
	)
}
