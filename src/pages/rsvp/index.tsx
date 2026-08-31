import { FadeGallery, FullScreenLoader, NoYes } from '@/components'
import { useSession } from '@/hooks'
import type { Properties, SuitStatus } from '@/utils'
import { logout, setSession, SUIT_STATUSES, updateNotionUser, WEDDING_DATE } from '@/utils'
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

const SAVED_SELECTION = 'We saved your selection, thanks for for keeping us up to date!'

export default function Index() {
	const { session, mutateSession } = useSession({
		redirectTo: '/rsvp/login',
		redirectIfNotLoggedIn: true,
	})
	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast({ duration: 2000 })
	const plusOneNameRef = useRef<HTMLInputElement>(null)
	const messageToUsRef = useRef<HTMLTextAreaElement>(null)

	if (!session || !session.isLoggedIn || !session.user?.properties) return <Spinner placeSelf='center' />

	const currentUser = session.user
	const { properties } = session.user // narrowed non-null by the guard above

	const suitStatus = properties.SuitStatus?.select?.name ?? 'Not Started'

	const updateProperty = async (patch: Properties, message: { title: string; description: string }) => {
		setIsLoading(true)
		const updated = await updateNotionUser(
			currentUser.id!, // a persisted Notion user always has an id
			{ ...currentUser, properties: { ...properties, ...patch } },
		)
		await mutateSession(await setSession({ ...session, user: updated }))
		toast({ ...message, status: 'success' })
		setIsLoading(false)
	}

	const handleChangeAttendance = (isAttending: boolean) =>
		updateProperty(
			{
				IsAttending: { ...properties.IsAttending, checkbox: isAttending },
				IsPlusOneAttending: {
					...properties.IsPlusOneAttending,
					checkbox: isAttending ? properties.IsPlusOneAttending?.checkbox : false,
				},
			},
			{ title: 'Attendance Updated', description: SAVED_SELECTION },
		)

	const handleChangeIsPlusOneAttending = (isPlusOneAttending: boolean) =>
		updateProperty(
			{ IsPlusOneAttending: { ...properties.IsPlusOneAttending, checkbox: isPlusOneAttending } },
			{ title: 'Plus One Attendance Updated', description: SAVED_SELECTION },
		)

	const handleChangePlusOneName = (plusOneName: string) =>
		updateProperty(
			{ PlusOneName: { ...properties.PlusOneName, rich_text: [{ type: 'text', text: { content: plusOneName } }] } },
			{ title: 'Plus One Name Updated', description: SAVED_SELECTION },
		)

	const handleChangeMessageToUs = (messageToUs: string) =>
		updateProperty(
			{ MessageToUs: { ...properties.MessageToUs, rich_text: [{ type: 'text', text: { content: messageToUs } }] } },
			{
				title: 'Message Updated',
				description: 'We saved your current message. Thanks for taking the time to write us something!',
			},
		)

	const handleChangeSuitStatus = (nextSuitStatus: SuitStatus) =>
		updateProperty(
			{ SuitStatus: { ...properties.SuitStatus, select: { name: nextSuitStatus } } },
			{ title: 'Suit Status Updated', description: 'We saved your latest suit status. Thank you!' },
		)

	const handleLogout = async () => await mutateSession(await logout())

	return (
		<>
			<FullScreenLoader visible={isLoading} />
			<FormControl isDisabled={isLoading}>
				<Grid placeItems='center' gap={10}>
					<Heading>Hello {properties.Name?.title?.[0]?.plain_text}!</Heading>

					<Text>
						Please let us know if you will be attending. Feel free to update at any time, but we would ask that you
						please finalize your info by:{' '}
						<Text as='span' textDecoration='underline'>
							{format(addMonths(WEDDING_DATE, -1), 'MM/dd/yyyy')}
						</Text>
					</Text>

					<NoYes
						isDisabled={isLoading}
						onChange={(value) => handleChangeAttendance(value ?? false)}
						value={properties.IsAttending?.checkbox ?? null}
					/>

					{properties.IsAttending?.checkbox && properties.Tags?.multi_select?.find((x) => x.name === '+1') && (
						<>
							<Text>
								Amazing!!! We're so glad you're coming! We want as many people as possible to come and have a good time.
								Did you have a Plus One in mind?{' '}
							</Text>

							<NoYes
								onChange={(value) => handleChangeIsPlusOneAttending(value ?? false)}
								value={properties.IsPlusOneAttending?.checkbox ?? null}
							/>
						</>
					)}

					{properties.IsPlusOneAttending?.checkbox && (
						<>
							<Text>Even better news! Would you mind letting us know their name?</Text>
							<Flex gap={2}>
								<Input ref={plusOneNameRef} defaultValue={properties.PlusOneName?.rich_text?.[0]?.plain_text} />
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

					{properties.Tags?.multi_select?.find((x) => x.name === 'Suit') && (
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
						<Textarea ref={messageToUsRef} defaultValue={properties.MessageToUs?.rich_text?.[0]?.plain_text} />
						<Button
							isLoading={isLoading}
							isDisabled={isLoading}
							onClick={() => handleChangeMessageToUs(messageToUsRef.current?.value ?? '')}
						>
							Submit
						</Button>
					</Flex>

					{properties.Tags?.multi_select?.find((x) => x.name === 'Bachelor') && (
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
