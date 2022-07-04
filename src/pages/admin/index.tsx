import { Button, Flex, Heading, Spinner } from '@chakra-ui/react'
import router from 'next/router'
import useUser, { User } from '../../hooks/useUser'
import { fetchJson } from '../../utils'

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

	const handleLogout = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		const user = (await fetchJson('/api/logout', { method: 'POST' })) as User
		mutateUser(user)
		router.push('/admin/login')
	}

	return (
		<Flex flexDir='column' justifyContent='center' alignItems='center'>
			<Heading mb={10}>Logged In!</Heading>
			<Button onClick={handleLogout}>Logout</Button>
		</Flex>
	)
}
