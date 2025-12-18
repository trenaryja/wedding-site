import { useSession } from '@/hooks'
import { login } from '@/utils'
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
import { FormEvent, useState } from 'react'

export default function Login() {
	const { session, mutateSession } = useSession({
		redirectTo: '/admin',
		redirectIfAdmin: true,
	})

	const [password, setPassword] = useState('')
	const [error, setError] = useState<Error | null>(null)
	const [useHerPhoneNumber, setUseHerPhoneNumber] = useState(false)

	if (!session) return <Spinner placeSelf='center' />

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (error) return

		try {
			await mutateSession(await login(password, useHerPhoneNumber))
			setError(null)
		} catch (err: unknown) {
			setError(err instanceof Error ? err : new Error('Login failed'))
		}
	}

	const handlePasswordChange = (value: string) => {
		setPassword(value)
		if (error) setError(null)
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
					<Input
						type='password'
						name='password'
						required
						value={password}
						onChange={(e) => handlePasswordChange(e.target.value)}
					/>
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>

				<Button isDisabled={!!error} type='submit'>
					Login
				</Button>
			</VStack>
		</form>
	)
}
