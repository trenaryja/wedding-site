import { Button, Heading, Spinner, Text, VStack } from '@chakra-ui/react'
import { addMonths, format } from 'date-fns'
import useSession from '../../hooks/useSession'
import { logout, WEDDING_DATE } from '../../utils'

export default function Index() {
	const { session, mutateSession } = useSession({
		redirectTo: '/rsvp/login',
		redirectIfNotLoggedIn: true,
	})

	if (!session || !session.isLoggedIn) return <Spinner />

	const handleLogout = async () => await mutateSession(await logout())

	return (
		<VStack textAlign='center'>
			<Heading>Hello {session.user.firstName}!</Heading>

			<Text maxW={'lg'}>
				Please Let us know if you will be attending. Feel free to update at any time, but we would ask that you please
				finalize finalize your info by:{' '}
				<Text as='span' textDecoration='underline'>
					{format(addMonths(WEDDING_DATE, -1), 'MM/dd/yyyy')}
				</Text>
			</Text>

			<Text as='pre' textAlign='initial'>
				{JSON.stringify(session, null, 2)}
			</Text>

			<Button onClick={handleLogout}>Logout</Button>
		</VStack>
	)
}
