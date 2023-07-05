import { Box, Button, Heading, Image, Link, Text, useTheme } from '@chakra-ui/react'
import { Timeline } from '@mantine/core'
import { addDays, format } from 'date-fns'
import { FaGolfBall, FaPlaneArrival, FaPlaneDeparture, FaShip } from 'react-icons/fa'
import { BACHELOR_PARTY_DATE } from '../utils'

const waiverUrl = 'https://stbd.io/pzSvcR'

const titleFormat = (date: Date) => format(date, 'M/d - eeee').toUpperCase()

export default function Index() {
	const theme = useTheme()

	return (
		<>
			<Image
				src='https://media3.giphy.com/media/ggtpYV17RP9lTbc542/giphy.gif?cid=ecf05e47ks3qw99vajsjc7y57pgv3cgnyijfvcbwppdw77yf&ep=v1_gifs_search&rid=giphy.gif&ct=g'
				w='100%'
				alt='welcome aboard'
			/>

			<Heading>When?</Heading>
			<Text fontSize='2xl' fontWeight='bold'>
				Labor Day Weekend: <br />
				{format(BACHELOR_PARTY_DATE, 'LLL d')} - {format(addDays(BACHELOR_PARTY_DATE, 3), 'LLL d')}
			</Text>

			<Heading>Who?</Heading>
			<Text>If you're reading this, you're invited. Should be about 10 dudes. No more than 14.</Text>

			<Heading>Where?</Heading>
			<Text>Address: 424 Gold Way, Pittsburgh, PA 15213</Text>
			<Link href='https://goo.gl/maps/6KRqE1pG43pYxsFF6' target='_blank'>
				<Button>Get Directions</Button>
			</Link>
			<iframe
				style={{
					borderRadius: theme.radii['3xl'],
					height: theme.sizes.md,
					width: '100%',
					filter: 'grayscale(.5)',
				}}
				title='map'
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46301.45127581743!2d-80.0202433251226!3d40.44505316425516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8834f230a43f9069%3A0x7c7b29a10c8a6816!2s424%20Gold%20Way%2C%20Pittsburgh%2C%20PA%2015213!5e1!3m2!1sen!2sus!4v1688438777795!5m2!1sen!2sus'
			/>

			<Heading>What's the plan?</Heading>

			<Link href={waiverUrl}>Click here to sign the waiver</Link>

			<Timeline bulletSize={32} lineWidth={2} py={20}>
				<Timeline.Item bullet={<FaPlaneArrival size={16} />} title={titleFormat(BACHELOR_PARTY_DATE)}>
					<ul>
						<li>
							04:00pm: Get to the Airbnb. Let me or Ross know if you need picked up from the airport and we'll figure
							out picking you up.
						</li>
						<li>06:00pm: Games. So many games. WV Rules</li>
						<li>??:??am: Sleep</li>
					</ul>
					{/* <Text>Get to Pittsburgh. Drive, Fly, Walk, I don't care. Get there</Text> */}
				</Timeline.Item>

				<Timeline.Item bullet={<FaShip size={16} />} title={titleFormat(addDays(BACHELOR_PARTY_DATE, 1))}>
					<ul>
						<li>09:00am: Wake up</li>
						<li>09:30am: Jay makes breakfast</li>
						<li>11:00am: Get on the party bus</li>
						<li>12:00pm: Get off the party bus and onto the boat</li>
						<li>02:00pm: Get off boat and onto party bus</li>
						<li>02:01pm: Go meet Len and the hoes? Lunch?</li>
						<li>04:00pm: Get off boat? and onto party bus</li>
						<li>04:01pm: Go back to Airbnb</li>
						<li>05:00pm: Shit, shower, shnacks. And games. Flip cup?</li>
						<li>07:30pm: Get on the party bus</li>
						<li>08:00pm: Bar #1 Food</li>
						<li>08:45pm: Bar #2 Games</li>
						<li>09:30pm: Bar #3 Cheerleaders</li>
						<li>10:29pm: Get on the party bus</li>
						<li>10:30pm: Go back to Airbnb</li>
						<li>??:??am: Sleep</li>
					</ul>
				</Timeline.Item>

				<Timeline.Item bullet={<FaGolfBall size={16} />} title={titleFormat(addDays(BACHELOR_PARTY_DATE, 2))}>
					<ul>
						<li>10:00am: Wake up</li>
						<li>??:??pm: Food</li>
						<li>??:??pm: Carpool to TopGolf</li>
						<li>??:??pm: Carpool back to Airbnb</li>
						<li>??:??pm: Nap</li>
						<li>??:??pm: Food</li>
						<li>??:??pm: Card Games</li>
						<li>??:??pm: Yard Games</li>
						<li>??:??pm: Games</li>
						<li>??:??pm: Games</li>
						<li>??:??pm: Snacks</li>
						<li>??:??pm: Games</li>
						<li>??:??am: Sleep</li>
					</ul>
				</Timeline.Item>

				<Timeline.Item bullet={<FaPlaneDeparture size={16} />} title={titleFormat(addDays(BACHELOR_PARTY_DATE, 3))}>
					<ul>
						<li>11:00am? Clean up Airbnb and leave</li>
					</ul>
				</Timeline.Item>
			</Timeline>
			<Heading>How much will this cost?</Heading>
			<Text>
				~$150-225 per night. Depends on how many people make it for how many nights, and could be cheaper. I'm covering
				the Airbnb myself, and asking everyone to split the party bus, the boat, TopGolf reservation, and the
				food/supplies. Please bring whatever you want/can to drink/share. I'll have a spreadsheet that I'll share with
				everyone to show the math of how it's split up. You can just Venmo me your share, and I'll mark you as paid in
				the spreadsheet.
			</Text>
			<Heading>What do I need to bring?</Heading>
			<ul>
				<li>Alcohol (if you're not flying)</li>
				<li>A plain white t-shirt</li>
				<li>Clothes you don't mind getting wet</li>
				<li>Some amount of cash (including singles)</li>
				<li>
					<Link href={waiverUrl} target='_blank'>
						This form. Click here. Fill it out before you come please.
					</Link>
				</li>
				<li>Good vibes</li>
			</ul>
			<Heading>Got a playlist?</Heading>
			<Box w='100%' sx={{ aspectRatio: '16/9' }}>
				<iframe
					width='100%'
					height='100%'
					src='https://www.youtube.com/embed/videoseries?list=PLr0FUd4lucWRS4j3erY1YxxYh_-Eu4mxu'
					title='YouTube video player'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				></iframe>
			</Box>
			<Heading>Random 💩:</Heading>
			<Image src='dickarm.svg' alt='dick arm' p={10} w='100%' />
			<Box w='100%' sx={{ aspectRatio: '4 / 3	' }}>
				<iframe
					width='100%'
					height='100%'
					src='https://www.youtube.com/embed/9jlaZL7CWHY'
					title='YouTube video player'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					allowFullScreen={true}
				></iframe>
			</Box>
		</>
	)
}
