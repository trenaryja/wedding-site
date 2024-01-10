import { Button, FormControl, FormErrorMessage, FormHelperText, Grid, Heading, HStack, Spinner } from '@chakra-ui/react'
import { intervalToDuration } from 'date-fns'
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { FullScreenLoader, OtpInput, PhoneInput } from '../../components'
import { useSession } from '../../hooks'
import { logout, padStart, sendOtp, validateOtp } from '../../utils'

export default function Login() {
	const { session, mutateSession } = useSession({
		redirectTo: '/rsvp',
		redirectIfLoggedIn: true,
	})
	const hasOtp = !!session?.otp
	const [phone, setPhone] = useState('')
	const [otp, setOtp] = useState('')
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState(false)
	const [remainingTime, setRemainingTime] = useState(0)

	useEffect(() => setError(null), [phone, otp])
	useEffect(() => {
		const interval = setInterval(async () => {
			if (remainingTime > 0) {
				setRemainingTime(remainingTime - 1000)
				return
			}
			if (hasOtp) {
				setError(new Error('OTP expired. Please try again.'))
				await mutateSession(await logout())
			}
		}, 1000)
		return () => clearInterval(interval)
	}, [hasOtp, mutateSession, remainingTime])

	const handleValidatePhone = () => {
		setError(null)
		if (phone && phone.length < 10) setError(new Error('Please enter a valid phone number'))
	}

	const handleCancel = async () => await mutateSession(await logout())

	const handleSubmitPhone = async (e: BaseSyntheticEvent) => {
		try {
			e.preventDefault()
			if (error) return
			setLoading(true)
			await mutateSession(await sendOtp(phone))
			setRemainingTime(2 * 60 * 1000)
			setError(null)
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	const handleSubmitOtp = async (e: BaseSyntheticEvent) => {
		try {
			e.preventDefault()
			if (error) return
			setLoading(true)
			await mutateSession(await validateOtp(otp))
			setError(null)
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	const handleSubmitForm = hasOtp ? handleSubmitOtp : handleSubmitPhone
	const heading = hasOtp ? 'Enter Passcode' : 'Enter Phone Number'
	const submitButtonText = hasOtp ? 'Submit Passcode' : 'Send Passcode'
	const duration = intervalToDuration({ start: 0, end: remainingTime })
	const formattedRemainingTime = `${padStart(duration.minutes, 2)}:${padStart(duration.seconds, 2)}`

	if (!session) return <Spinner placeSelf='center' />

	return (
		<>
			<FullScreenLoader visible={loading} />
			<form onSubmit={handleSubmitForm} style={{ display: 'grid', placeItems: 'center' }}>
				<Grid gap={10} placeItems='center'>
					<Heading>{heading}</Heading>
					<FormControl isInvalid={!!error} isDisabled={loading}>
						<Grid placeItems='center'>
							{!hasOtp && (
								<PhoneInput
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									onBlur={handleValidatePhone}
									isRequired
									showClearButton
								/>
							)}
							{hasOtp && <OtpInput value={otp} onChange={(value) => setOtp(value)} isRequired />}
							{hasOtp && <FormHelperText>{formattedRemainingTime}</FormHelperText>}
							<FormErrorMessage>{error?.message}</FormErrorMessage>
						</Grid>
					</FormControl>
					<HStack>
						{hasOtp && <Button onClick={handleCancel}>Cancel</Button>}
						<Button disabled={loading || !!error} type='submit'>
							{submitButtonText}
						</Button>
					</HStack>
				</Grid>
			</form>
		</>
	)
}
