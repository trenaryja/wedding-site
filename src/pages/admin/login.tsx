import { Button, Flex, FormControl, FormErrorMessage, Heading, Input } from '@chakra-ui/react'
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import { login } from '../../utils'

export default function Login() {
	const { mutateUser } = useUser({
		redirectTo: '/admin',
		redirectIfLoggedIn: true,
	})

	const [password, setPassword] = useState('')
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => setError(null), [password])

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		try {
			e.preventDefault()
			const user = await login(password)
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
						<Input type='password' name='password' required onChange={(e) => setPassword(e.target.value)} />
						<FormErrorMessage>{error?.message}</FormErrorMessage>
					</FormControl>
					<Button type='submit'>Login</Button>
				</Flex>
			</form>
		</Flex>
	)
}
