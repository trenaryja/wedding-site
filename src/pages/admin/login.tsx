import {
	Button,
	FormControl,
	FormErrorMessage,
	Heading,
	HStack,
	Input,
	Spinner,
	Switch,
	VStack,
} from '@chakra-ui/react'
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { useSession } from '../../hooks'
import { login } from '../../utils'

export default function Login() {
	const { session, mutateSession } = useSession({
		redirectTo: '/admin',
		redirectIfAdmin: true,
	})

	const [password, setPassword] = useState('')
	const [error, setError] = useState<Error | null>(null)
	const [useHerPhoneNumber, setUseHerPhoneNumber] = useState(false)

	useEffect(() => setError(null), [password])

	if (!session) return <Spinner />

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		try {
			e.preventDefault()
			if (error) return
			await mutateSession(await login(password, useHerPhoneNumber))
			setError(null)
		} catch (error) {
			setError(error)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<VStack gap={10}>
				<HStack>
					<Heading>♂️</Heading>
					<Switch size='lg' isChecked={useHerPhoneNumber} onChange={(e) => setUseHerPhoneNumber(e.target.checked)} />
					<Heading>♀️</Heading>
				</HStack>
				<Heading>Enter Password</Heading>
				<FormControl isInvalid={!!error}>
					<Input type='password' name='password' required onChange={(e) => setPassword(e.target.value)} />
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
				<Button disabled={!!error} type='submit'>
					Login
				</Button>
			</VStack>
		</form>
	)
}
