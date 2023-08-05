import { InfoIcon } from '@chakra-ui/icons'
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	Heading,
	HStack,
	Link,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Spinner,
	Text,
	VStack,
} from '@chakra-ui/react'
import { intervalToDuration } from 'date-fns'
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { OtpInput, PhoneInput } from '../../components'
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

	const phoneMessage = `Why? Because we want you to come to our wedding! Rest assured, I'm not selling it or anything. In fact, every time you use this page...it costs ya boi like a penny to send you a passcode. So please STAY LOGGED IN IF YOU CAN.`
	const otpMessage = `Please enter the passcode that was sent to your phone. If you don't see it, check your phone's spam folder. If you're still having trouble, reach out to Justin.`
	const handleSubmitForm = hasOtp ? handleSubmitOtp : handleSubmitPhone
	const heading = hasOtp ? 'Enter Passcode' : 'Enter Phone Number'
	const popoverMessage = hasOtp ? otpMessage : phoneMessage
	const submitButtonText = hasOtp ? 'Submit Passcode' : 'Send Passcode'
	const duration = intervalToDuration({ start: 0, end: remainingTime })
	const formattedRemainingTime = `${padStart(duration.minutes, 2)}:${padStart(duration.seconds, 2)}`

	if (!session) return <Spinner placeSelf='center' />

	return (
		<form onSubmit={handleSubmitForm}>
			<VStack gap={10}>
				<HStack gap={3} alignItems='baseline'>
					<Heading>{heading}</Heading>
					<Popover>
						<PopoverTrigger>
							<InfoIcon cursor='pointer' />
						</PopoverTrigger>
						<PopoverContent>
							<PopoverArrow />
							<PopoverBody>
								<Text mb={5}>{popoverMessage}</Text>
								<Link href='/rsvp/info'>Click here for more info</Link>
							</PopoverBody>
						</PopoverContent>
					</Popover>
				</HStack>
				<FormControl isInvalid={!!error}>
					<VStack>
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
					</VStack>
				</FormControl>
				<HStack>
					{hasOtp && <Button onClick={handleCancel}>Cancel</Button>}
					<Button disabled={loading || !!error} type='submit'>
						{submitButtonText}
					</Button>
				</HStack>
			</VStack>
		</form>
	)
}
