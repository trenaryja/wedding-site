/* eslint-disable react/no-unescaped-entities */
import {
	Button,
	FormControl,
	Heading,
	HStack,
	Input,
	Spinner,
	Text,
	Textarea,
	useToast,
	VStack,
} from '@chakra-ui/react'
import { addMonths, format } from 'date-fns'
import { useRef, useState } from 'react'
import { NoMaybeYes } from '../../components'
import { useSession } from '../../hooks'
import { logout, WEDDING_DATE } from '../../utils'

export default function Index() {
	const { session, mutateSession } = useSession({
		redirectTo: '/rsvp/login',
		redirectIfNotLoggedIn: true,
	})
	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast({ duration: 2000 })
	const plusOneNameRef = useRef<HTMLInputElement>(null)
	const messageToUsRef = useRef<HTMLTextAreaElement>(null)

	if (!session || !session.isLoggedIn) return <Spinner />

	const handleChangeAttendance = async (isAttending: boolean | null) => {
		setIsLoading(true)
		// const updated = await db.updateUser(session.user.id, { ...session.user, isAttending })
		// await mutateSession(await setSession({ ...session, user: updated }))
		toast({
			title: 'Attendance Updated',
			description: 'We saved your selection, thanks for for keeping us up to date!',
			status: 'success',
		})
		setIsLoading(false)
	}

	const handleChangeIsPlusOneAttending = async (isPlusOneAttending: boolean | null) => {
		setIsLoading(true)
		// const updated = await db.updateUser(session.user.id, { ...session.user, isPlusOneAttending })
		// await mutateSession(await setSession({ ...session, user: updated }))
		toast({
			title: 'Plus One Attendance Updated',
			description: 'We saved your selection, thanks for for keeping us up to date!',
			status: 'success',
		})
		setIsLoading(false)
	}

	const handleChangePlusOneName = async (plusOneName: string) => {
		setIsLoading(true)
		// const updated = await db.updateUser(session.user.id, { ...session.user, plusOneName })
		// await mutateSession(await setSession({ ...session, user: updated }))
		toast({
			title: 'Plus One Name Updated',
			description: 'We saved your selection, thanks for for keeping us up to date!',
			status: 'success',
		})
		setIsLoading(false)
	}

	const handleChangeMessageToUs = async (messageToUs: string) => {
		setIsLoading(true)
		// const updated = await db.updateUser(session.user.id, { ...session.user, messageToUs })
		// await mutateSession(await setSession({ ...session, user: updated }))
		toast({
			title: 'Message Updated',
			description: 'We saved your current message. Thanks for taking the time to write us something!',
			status: 'success',
		})
		setIsLoading(false)
	}

	const handleLogout = async () => await mutateSession(await logout())

	return (
		<FormControl isDisabled={isLoading} maxW='lg'>
			<VStack textAlign='center' gap={10}>
				<Heading>Hello {session.user.properties.Name?.title?.[0]?.plain_text}!</Heading>

				<Text maxW={'lg'}>
					Please Let us know if you will be attending. Feel free to update at any time, but we would ask that you please
					finalize finalize your info by:{' '}
					<Text as='span' textDecoration='underline'>
						{format(addMonths(WEDDING_DATE, -1), 'MM/dd/yyyy')}
					</Text>
				</Text>

				<NoMaybeYes onChange={handleChangeAttendance} value={session.user.properties.IsAttending?.checkbox} />

				{session.user.properties.IsAttending?.checkbox &&
					session.user.properties.Tags?.multi_select?.find((x) => x.name === '+1') && (
						<>
							<Text maxW={'lg'}>
								Amazing!!! We're so glad you're coming! We want as many people as possible to come and have a good time.
								Did you have a Plus One in mind?{' '}
							</Text>

							<NoMaybeYes
								onChange={handleChangeIsPlusOneAttending}
								value={session.user.properties.IsPlusOneAttending?.checkbox}
							/>
						</>
					)}

				{session.user.properties.IsPlusOneAttending?.checkbox && (
					<>
						<Text maxW='lg'>Even better news! Would you mind letting us know their name?</Text>
						<HStack>
							<Input
								ref={plusOneNameRef}
								defaultValue={session.user.properties.PlusOneName?.rich_text?.[0]?.plain_text}
							/>
							<Button onClick={() => handleChangePlusOneName(plusOneNameRef.current.value)}>Submit</Button>
						</HStack>
					</>
				)}

				<Text maxW='lg'>
					Any notes you'd like to share with us? We'll be sure to check these before the wedding And after, so feel free
					to leave us any message you'd like
				</Text>
				<VStack alignItems='end' w='100%'>
					<Textarea
						ref={messageToUsRef}
						defaultValue={session.user.properties.MessageToUs?.rich_text?.[0]?.plain_text}
					/>
					<Button onClick={() => handleChangeMessageToUs(messageToUsRef.current.value)}>Submit</Button>
				</VStack>

				<Button onClick={handleLogout}>Logout</Button>
			</VStack>
		</FormControl>
	)
}
