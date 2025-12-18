import { FadeGallery, FullScreenLoader, NoYes } from '@/components'
import { useSession } from '@/hooks'
import { SUIT_STATUSES, SuitStatus, WEDDING_DATE, logout, setSession, updateNotionUser } from '@/utils'
import {
	Button,
	Flex,
	FormControl,
	Grid,
	Heading,
	Input,
	Link,
	Radio,
	RadioGroup,
	Spinner,
	Text,
	Textarea,
	useToast,
} from '@chakra-ui/react'
import { addMonths, format } from 'date-fns'
import { useRef, useState } from 'react'

export default function Index() {
	const { session, mutateSession } = useSession({
		redirectTo: '/rsvp/login',
		redirectIfNotLoggedIn: true,
	})
	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast({ duration: 2000 })
	const plusOneNameRef = useRef<HTMLInputElement>(null)
	const messageToUsRef = useRef<HTMLTextAreaElement>(null)

	if (!session || !session.isLoggedIn) return <Spinner placeSelf='center' />

	const suitStatus = session.user.properties.SuitStatus.select?.name || 'Not Started'

	const updateUser = async (user: typeof session.user) => {
		const updated = await updateNotionUser(session.user.id, user)
		await mutateSession(await setSession({ ...session, user: updated }))
	}

	const handleChangeAttendance = async (isAttending: boolean) => {
		setIsLoading(true)
		await updateUser({
			...session.user,
			properties: {
				...session.user.properties,
				IsAttending: {
					...session.user.properties.IsAttending,
					checkbox: isAttending,
				},
				IsPlusOneAttending: {
					...session.user.properties.IsPlusOneAttending,
					checkbox: isAttending ? session.user.properties.IsPlusOneAttending.checkbox : false,
				},
			},
		})
		toast({
			title: 'Attendance Updated',
			description: 'We saved your selection, thanks for for keeping us up to date!',
			status: 'success',
		})
		setIsLoading(false)
	}

	const handleChangeIsPlusOneAttending = async (isPlusOneAttending: boolean) => {
		setIsLoading(true)
		await updateUser({
			...session.user,
			properties: {
				...session.user.properties,
				IsPlusOneAttending: {
					...session.user.properties.IsPlusOneAttending,
					checkbox: isPlusOneAttending,
				},
			},
		})
		toast({
			title: 'Plus One Attendance Updated',
			description: 'We saved your selection, thanks for for keeping us up to date!',
			status: 'success',
		})
		setIsLoading(false)
	}

	const handleChangePlusOneName = async (plusOneName: string) => {
		setIsLoading(true)
		await updateUser({
			...session.user,
			properties: {
				...session.user.properties,
				PlusOneName: {
					...session.user.properties.PlusOneName,
					rich_text: [{ type: 'text', text: { content: plusOneName } }],
				},
			},
		})
		toast({
			title: 'Plus One Name Updated',
			description: 'We saved your selection, thanks for for keeping us up to date!',
			status: 'success',
		})
		setIsLoading(false)
	}

	const handleChangeMessageToUs = async (messageToUs: string) => {
		setIsLoading(true)
		await updateUser({
			...session.user,
			properties: {
				...session.user.properties,
				MessageToUs: {
					...session.user.properties.MessageToUs,
					rich_text: [{ type: 'text', text: { content: messageToUs } }],
				},
			},
		})
		toast({
			title: 'Message Updated',
			description: 'We saved your current message. Thanks for taking the time to write us something!',
			status: 'success',
		})
		setIsLoading(false)
	}

	const handleChangeSuitStatus = async (suitStatus: SuitStatus) => {
		setIsLoading(true)
		await updateUser({
			...session.user,
			properties: {
				...session.user.properties,
				SuitStatus: {
					...session.user.properties.SuitStatus,
					select: { name: suitStatus },
				},
			},
		})
		toast({
			title: 'Suit Status Updated',
			description: 'We saved your latest suit status. Thank you!',
			status: 'success',
		})
		setIsLoading(false)
	}

	const handleLogout = async () => await mutateSession(await logout())

	return (
		<>
			<FullScreenLoader visible={isLoading} />
			<FormControl isDisabled={isLoading}>
				<Grid placeItems='center' gap={10}>
					<Heading>Hello {session.user.properties.Name?.title?.[0]?.plain_text}!</Heading>

					<Text>
						Please let us know if you will be attending. Feel free to update at any time, but we would ask that you
						please finalize your info by:{' '}
						<Text as='span' textDecoration='underline'>
							{format(addMonths(WEDDING_DATE, -1), 'MM/dd/yyyy')}
						</Text>
					</Text>

					<NoYes
						isDisabled={isLoading}
						onChange={handleChangeAttendance}
						value={session.user.properties.IsAttending?.checkbox}
					/>

					{session.user.properties.IsAttending?.checkbox &&
						session.user.properties.Tags?.multi_select?.find((x) => x.name === '+1') && (
							<>
								<Text>
									Amazing!!! We're so glad you're coming! We want as many people as possible to come and have a good
									time. Did you have a Plus One in mind?{' '}
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
								<Button
									isLoading={isLoading}
									isDisabled={isLoading}
									onClick={() => handleChangePlusOneName(plusOneNameRef.current?.value ?? '')}
								>
									Submit
								</Button>
							</Flex>
						</>
					)}

					{session.user.properties.Tags.multi_select.find((x) => x.name === 'Suit') && (
						<>
							<Text>
								Looks like we've asked you to wear a suit! Please keep us in the loop on where you're at in the process.
								I'll try to update this when I have a deadline, but I'm guessing we should get fitted at least a month
								before the wedding, so let's say by{' '}
								<Text as='span' textDecoration='underline'>
									{format(addMonths(WEDDING_DATE, -1), 'MM/dd/yyyy')}
								</Text>
							</Text>
							<RadioGroup value={suitStatus} onChange={handleChangeSuitStatus}>
								<Grid gap={3}>
									{SUIT_STATUSES.map((x) => (
										<Radio key={x} value={x} size='lg'>
											<Heading size='md'>{x}</Heading>
										</Radio>
									))}
								</Grid>
							</RadioGroup>
						</>
					)}

					<Text>
						Any notes you'd like to share with us? We'll be sure to check these before the wedding and after, so feel
						free to leave us any message you'd like
					</Text>

					<Flex flexDirection='column' alignItems='end' w='100%'>
						<Textarea
							ref={messageToUsRef}
							defaultValue={session.user.properties.MessageToUs?.rich_text?.[0]?.plain_text}
						/>
						<Button
							isLoading={isLoading}
							isDisabled={isLoading}
							onClick={() => handleChangeMessageToUs(messageToUsRef.current?.value ?? '')}
						>
							Submit
						</Button>
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
								<Button isDisabled={isLoading} height='auto' display='grid' p={3}>
									<Text fontSize='2xl'>Bachelor Party Info</Text>
									<Text fontSize='2xl'>Click Here</Text>
								</Button>
							</Link>
						</Grid>
					)}

					<Button isDisabled={isLoading} onClick={handleLogout}>
						Logout
					</Button>
				</Grid>
			</FormControl>
		</>
	)
}
