import {
	Box,
	BoxProps,
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	Textarea,
	useToast,
} from '@chakra-ui/react'
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { PhoneInput } from '.'
import { sendSms } from '../utils'

export const SmsForm = (props: BoxProps) => {
	const [to, setTo] = useState('')
	const [body, setBody] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<Error | null>()
	const toast = useToast()

	useEffect(() => setError(null), [to])

	const handleSendSms = async (e: BaseSyntheticEvent) => {
		try {
			e.preventDefault()
			if (error) return
			setLoading(true)
			await sendSms(to, body)
			toast({ title: 'SMS sent!', status: 'success' })
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	const handleValidate = () => {
		if (to && to.length < 10) setError(new Error('Please enter a valid phone number'))
	}

	return (
		<Box maxW='sm' p={5} {...props}>
			<form onSubmit={handleSendSms}>
				<FormControl isInvalid={!!error}>
					<PhoneInput value={to} onChange={(e) => setTo(e.target.value)} onBlur={handleValidate} isRequired />
					<FormErrorMessage>{error?.message}</FormErrorMessage>
				</FormControl>
				<FormControl my={5} display='flex' flexDirection='column'>
					<Textarea
						value={body}
						onChange={(e) => setBody(e.target.value)}
						isRequired
						placeholder='Message'
						maxLength={160}
					/>
					<FormHelperText mt={1} alignSelf='flex-end'>{`${body.length}/160`}</FormHelperText>
				</FormControl>
				<Button float='right' disabled={loading || !!error} type='submit'>
					Send SMS
				</Button>
			</form>
		</Box>
	)
}
