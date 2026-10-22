import { FullScreenLoader, OtpInput, PhoneInput } from '@/components'
import { useSession } from '@/hooks'
import { logout, padStart, sendOtp, settle, validateOtp } from '@/utils'
import { Button, FormControl, FormErrorMessage, FormHelperText, Grid, Heading, HStack, Spinner } from '@chakra-ui/react'
import { intervalToDuration } from 'date-fns'
import type { BaseSyntheticEvent } from 'react'
import { useEffect, useState } from 'react'

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

	useEffect(() => {
		const interval = setInterval(() => {
			if (remainingTime > 0) {
				setRemainingTime(remainingTime - 1000)
				return
			}
			if (hasOtp) {
				setError(new Error('OTP expired. Please try again.'))
				void logout().then(mutateSession)
			}
		}, 1000)
		return () => clearInterval(interval)
	}, [hasOtp, mutateSession, remainingTime])

	const handleValidatePhone = () => {
		setError(null)
		if (phone && phone.length < 10) setError(new Error('Please enter a valid phone number'))
	}

	const handleCancel = async () => await mutateSession(await logout())

	const onSubmitError = (err: unknown) => setError(err instanceof Error ? err : new Error(String(err)))

	const handleSubmitPhone = (e: BaseSyntheticEvent) =>
		settle(
			async () => {
				e.preventDefault()
				if (error) return
				setLoading(true)
				await mutateSession(await sendOtp(phone))
				setRemainingTime(2 * 60 * 1000)
				setError(null)
			},
			onSubmitError,
			() => setLoading(false),
		)

	const handleSubmitOtp = (e: BaseSyntheticEvent) =>
		settle(
			async () => {
				e.preventDefault()
				if (error) return
				setLoading(true)
				await mutateSession(await validateOtp(otp))
				setError(null)
			},
			onSubmitError,
			() => setLoading(false),
		)

	const handleSubmitForm = hasOtp ? handleSubmitOtp : handleSubmitPhone
	const heading = hasOtp ? 'Enter Passcode' : 'Enter Phone Number'
	const submitButtonText = hasOtp ? 'Submit Passcode' : 'Send Passcode'
	const duration = intervalToDuration({ start: 0, end: remainingTime })
	const formattedRemainingTime = `${padStart(duration.minutes ?? 0, 2)}:${padStart(duration.seconds ?? 0, 2)}`

	if (!session) return <Spinner placeSelf='center' />

	return (
		<>
			<FullScreenLoader visible={loading} />
			<form onSubmit={(e) => void handleSubmitForm(e)} style={{ display: 'grid', placeItems: 'center' }}>
				<Grid gap={10} placeItems='center'>
					<Heading>{heading}</Heading>
					<FormControl isInvalid={!!error} isDisabled={loading}>
						<Grid placeItems='center'>
							{!hasOtp && (
								<PhoneInput
									value={phone}
									onChange={(phoneNumber) => {
										setPhone(phoneNumber)
										setError(null)
									}}
									onBlur={handleValidatePhone}
									isRequired
									showClearButton
								/>
							)}
							{hasOtp && (
								<OtpInput
									value={otp}
									onChange={(value) => {
										setOtp(value)
										setError(null)
									}}
									isRequired
								/>
							)}
							{hasOtp && <FormHelperText>{formattedRemainingTime}</FormHelperText>}
							<FormErrorMessage>{error?.message}</FormErrorMessage>
						</Grid>
					</FormControl>
					<HStack>
						{hasOtp && <Button onClick={() => void handleCancel()}>Cancel</Button>}
						<Button disabled={loading || !!error} type='submit'>
							{submitButtonText}
						</Button>
					</HStack>
				</Grid>
			</form>
		</>
	)
}
