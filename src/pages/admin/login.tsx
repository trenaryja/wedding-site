import { Button, Flex, FormControl, FormErrorMessage, Heading, Input } from '@chakra-ui/react'
import { useState } from 'react'
import useUser, { User } from '../../hooks/useUser'
import { fetchJson } from '../../utils'

export default function Login() {
	const { mutateUser } = useUser({
		redirectTo: '/admin',
		redirectIfLoggedIn: true,
	})

	const [error, setError] = useState<Error | null>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const user = (await fetchJson('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					password: e.currentTarget.password.value,
				}),
			})) as User

			mutateUser(user)
			setError(null)
		} catch (err) {
			setError(err)
		}
	}

	return (
		<Flex alignItems='center'>
			<form onSubmit={handleSubmit}>
				<Flex flexDir='column' justifyContent='center' alignItems='center' gap={10}>
					<Heading>Enter Password</Heading>
					<FormControl isInvalid={!!error}>
						<Input type='password' name='password' required onChange={() => setError(null)} />
						<FormErrorMessage>{error?.message}</FormErrorMessage>
					</FormControl>
					<Button type='submit'>Login</Button>
				</Flex>
			</form>
		</Flex>
	)
}
