import { Box, BoxProps, Button, Checkbox, FormControl, FormErrorMessage, Input, Text, VStack } from '@chakra-ui/react'
import { User } from '@prisma/client'
import { BaseSyntheticEvent, useState } from 'react'
import { exists } from '../utils'
import PhoneInput from './PhoneInput'

type UserFormProps = {
	data: User
	onSubmit: (user: User) => Promise<void>
} & Omit<BoxProps, 'onSubmit'>

export default function UserForm({ data, onSubmit, ...props }: UserFormProps) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<Error | null>()
	const [phone, setPhone] = useState(data?.phone || '')
	const [firstName, setFirstName] = useState(data?.firstName || '')
	const [lastName, setLastName] = useState(data?.lastName || '')
	const [isAttending, setIsAttending] = useState(data?.isAttending)

	const formData: User = {
		id: data?.id,
		firstName,
		lastName,
		phone,
		isAttending,
	}

	// const handleValidate = () => {
	// 	if (phone && phone.length < 10) setError(new Error('Please enter a valid phone number'))
	// }

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		try {
			e.preventDefault()
			if (error) return
			setLoading(true)
			await onSubmit(formData)
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	const isAttendingMessage = !exists(isAttending) ? 'Maybe' : isAttending ? 'Yes' : 'No'

	return (
		<Box {...props}>
			<form onSubmit={handleSubmit}>
				<VStack gap={5}>
					<FormControl>
						<Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
					</FormControl>
					<FormControl>
						<Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
					</FormControl>
					<FormControl isInvalid={phone && phone.length < 10}>
						<PhoneInput value={phone} onChange={(value) => setPhone(value)} isRequired />
						<FormErrorMessage>{'Please enter a valid phone number'}</FormErrorMessage>
					</FormControl>
					<FormControl>
						<Checkbox
							onChange={(e) => setIsAttending(e.target.checked)}
							isChecked={isAttending}
							isIndeterminate={!exists(isAttending)}
						/>
						<Text>{isAttendingMessage}</Text>
					</FormControl>
					<Button disabled={loading || !!error} type='submit'>
						Save
					</Button>
				</VStack>
			</form>
		</Box>
	)
}
