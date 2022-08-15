import { Box, BoxProps, Button, FormControl, FormErrorMessage } from '@chakra-ui/react'
import { User } from '@prisma/client'
import { BaseSyntheticEvent, useState } from 'react'
import PhoneInput from './PhoneInput'

type UserFormProps = {
	data: User
	isModal: boolean
	onSubmit: (user: Partial<User>) => Promise<void>
} & BoxProps

export default function UserForm({ data, isModal, onSubmit, ...props }: UserFormProps) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<Error | null>()
	const [to, setTo] = useState('')

	const handleValidate = () => {
		if (to && to.length < 10) setError(new Error('Please enter a valid phone number'))
	}

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		try {
			e.preventDefault()
			if (error) return
			setLoading(true)
			await onSubmit({ ...data })
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Box {...props}>
			<form onSubmit={handleSubmit}>
				<FormControl isInvalid={!!error}>
					<PhoneInput value={to} onChange={(value) => setTo(value)} onBlur={handleValidate} isRequired />
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
				<Button float='right' disabled={loading || !!error} type='submit'>
					Save
				</Button>
			</form>
		</Box>
	)
}
