/* eslint-disable react/no-unescaped-entities */
import {
	Button,
	Flex,
	FormControl,
	Grid,
	Heading,
	Input,
	Link,
	Spinner,
	Text,
	Textarea,
	useToast,
} from '@chakra-ui/react'
import { addMonths, format } from 'date-fns'
import { useRef, useState } from 'react'
import { FadeGallery, NoYes } from '../../components'
import { useSession } from '../../hooks'
import { WEDDING_DATE, db, logout, setSession } from '../../utils'

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

	const handleChangeAttendance = async (isAttending: boolean) => {
		setIsLoading(true)
		session.user.properties.IsAttending.checkbox = isAttending
		if (!isAttending) {
			session.user.properties.IsPlusOneAttending.checkbox = false
		}
		const updated = await db.updateNotionUser(session.user.id, session.user)
		await mutateSession(await setSession({ ...session, user: updated }))
		toast({
			title: 'Attendance Updated',
			description: 'We saved your selection, thanks for for keeping us up to date!',
			status: 'success',
		})
		setIsLoading(false)
	}

	const handleChangeIsPlusOneAttending = async (isPlusOneAttending: boolean) => {
		setIsLoading(true)
		session.user.properties.IsPlusOneAttending.checkbox = isPlusOneAttending
		const updated = await db.updateNotionUser(session.user.id, session.user)
		await mutateSession(await setSession({ ...session, user: updated }))
		toast({
			title: 'Plus One Attendance Updated',
			description: 'We saved your selection, thanks for for keeping us up to date!',
			status: 'success',
		})
		setIsLoading(false)
	}

	const handleChangePlusOneName = async (plusOneName: string) => {
		setIsLoading(true)
		session.user.properties.PlusOneName.rich_text = [{ type: 'text', text: { content: plusOneName } }]
		const updated = await db.updateNotionUser(session.user.id, session.user)
		await mutateSession(await setSession({ ...session, user: updated }))
		toast({
			title: 'Plus One Name Updated',
			description: 'We saved your selection, thanks for for keeping us up to date!',
			status: 'success',
		})
		setIsLoading(false)
	}

	const handleChangeMessageToUs = async (messageToUs: string) => {
		setIsLoading(true)
		session.user.properties.MessageToUs.rich_text = [{ type: 'text', text: { content: messageToUs } }]
		const updated = await db.updateNotionUser(session.user.id, session.user)
		await mutateSession(await setSession({ ...session, user: updated }))
		toast({
			title: 'Message Updated',
			description: 'We saved your current message. Thanks for taking the time to write us something!',
			status: 'success',
		})
		setIsLoading(false)
	}

	const handleLogout = async () => await mutateSession(await logout())

	return (
		<FormControl isDisabled={isLoading}>
			<Grid placeItems='center' gap={10}>
				<Heading>Hello {session.user.properties.Name?.title?.[0]?.plain_text}!</Heading>

				<Text>
					Please Let us know if you will be attending. Feel free to update at any time, but we would ask that you please
					finalize finalize your info by:{' '}
					<Text as='span' textDecoration='underline'>
						{format(addMonths(WEDDING_DATE, -1), 'MM/dd/yyyy')}
					</Text>
				</Text>

				<NoYes onChange={handleChangeAttendance} value={session.user.properties.IsAttending?.checkbox} />

				{session.user.properties.IsAttending?.checkbox &&
					session.user.properties.Tags?.multi_select?.find((x) => x.name === '+1') && (
						<>
							<Text>
								Amazing!!! We're so glad you're coming! We want as many people as possible to come and have a good time.
								Did you have a Plus One in mind?{' '}
							</Text>

							<NoYes
								onChange={handleChangeIsPlusOneAttending}
								value={session.user.properties.IsPlusOneAttending?.checkbox}
							/>
						</>
					)}

				{session.user.properties.IsPlusOneAttending?.checkbox && (
					<>
						<Text>Even better news! Would you mind letting us know their name?</Text>
						<Flex gap={2}>
							<Input
								ref={plusOneNameRef}
								defaultValue={session.user.properties.PlusOneName?.rich_text?.[0]?.plain_text}
							/>
							<Button onClick={() => handleChangePlusOneName(plusOneNameRef.current.value)}>Submit</Button>
						</Flex>
					</>
				)}

				<Text>
					Any notes you'd like to share with us? We'll be sure to check these before the wedding And after, so feel free
					to leave us any message you'd like
				</Text>

				<Flex flexDirection='column' alignItems='end' w='100%'>
					<Textarea
						ref={messageToUsRef}
						defaultValue={session.user.properties.MessageToUs?.rich_text?.[0]?.plain_text}
					/>
					<Button onClick={() => handleChangeMessageToUs(messageToUsRef.current.value)}>Submit</Button>
				</Flex>

				{session.user.properties.Tags.multi_select.find((x) => x.name === 'Bachelor') && (
					<Grid placeItems='center'>
						<FadeGallery
							urls={[
								'https://media3.giphy.com/media/oRQzOUbz5Pxy2zG22R/200w.webp?cid=ecf05e47v3h77qy1pwie8v0enlefg08cgmqqomsuq3c1s8ob&ep=v1_stickers_search&rid=200w.webp&ct=s',
								'https://media4.giphy.com/media/pceVybjkyv4fX8B5el/giphy.webp?cid=ecf05e47v3h77qy1pwie8v0enlefg08cgmqqomsuq3c1s8ob&ep=v1_stickers_search&rid=giphy.webp&ct=s',
								'https://media1.giphy.com/media/lTVae8rm9lT4oixG1k/200.webp?cid=ecf05e47v3h77qy1pwie8v0enlefg08cgmqqomsuq3c1s8ob&ep=v1_stickers_search&rid=200.webp&ct=s',
								'https://media3.giphy.com/media/J4tmAD8ncNhZwnLjm5/200w.webp?cid=ecf05e47v3h77qy1pwie8v0enlefg08cgmqqomsuq3c1s8ob&ep=v1_stickers_search&rid=200w.webp&ct=s',
								'https://media2.giphy.com/media/XE1JgG82ZMcIyEh9OW/200.webp?cid=ecf05e47bb98agk543gacxlbflqdc66gi857muf5rrt5k5vs&ep=v1_stickers_search&rid=200.webp&ct=s',
								'https://media2.giphy.com/media/5VhsZMaZH0Do0UHEJr/200w.webp?cid=ecf05e47bb98agk543gacxlbflqdc66gi857muf5rrt5k5vs&ep=v1_stickers_search&rid=200w.webp&ct=s',
								'https://media4.giphy.com/media/7zSETlBLKcjJo8XHeW/200w.webp?cid=ecf05e478pqa294giabes2dc8v67uqieobo50k0evauvd3re&ep=v1_stickers_search&rid=200w.webp&ct=s',
								'https://media4.giphy.com/media/4Zkj0ytwxhNw2cMhmU/200w.webp?cid=ecf05e477lelxgr6vuxjqu5z33lb4v5649589jbneh17we07&ep=v1_stickers_search&rid=200w.webp&ct=s',
								'https://giphy.com/stickers/host-wjh-wjhonfox-S9VyMlgJ4DXjhVmT64',
							]}
						/>
						<Link href='/bachelor'>
							<Button height='auto' display='grid' p={3}>
								<Text fontSize='2xl'>Bachelor Party Info</Text>
								<Text fontSize='2xl'>Click Here</Text>
							</Button>
						</Link>
					</Grid>
				)}

				<Button onClick={handleLogout}>Logout</Button>
			</Grid>
		</FormControl>
	)
}
