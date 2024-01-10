import { SleepingArrangements, TimelineItem } from '@/components'
import { BACHELOR_PARTY_DATE } from '@/utils'
import { Box, Button, Grid, Heading, Image, Link, Text, useTheme } from '@chakra-ui/react'
import { addDays, format } from 'date-fns'
import { FaGolfBall, FaPlaneArrival, FaPlaneDeparture, FaShip } from 'react-icons/fa'

const waiverUrl = 'https://stbd.io/pzSvcR'

const titleFormat = (date: Date) => format(date, 'eeee - M/d').toUpperCase()

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

			<Heading>Sleeping Arrangements?</Heading>
			<Text>Subject to change, this is just a guess. Get ready to get cozy my dudes.</Text>
			<SleepingArrangements />

			<Heading>What do I need to do?</Heading>
			<Box>
				<ul>
					<li>
						<Link href={waiverUrl}>Click here to sign the boat waiver</Link>
					</li>
					<li>
						Things to bring:
						<ul>
							<li>Alcohol. I'll have seltzers and clear liqour. If you want brown, bring it down.</li>
							<li>Small coolers for the boat</li>
							<li>A plain white t-shirt</li>
							<li>Swim trunks</li>
							<li>Some amount of cash (including singles)</li>
							<li>Any games you think would be a hit</li>
							<li>Good Vibes</li>
						</ul>
					</li>
				</ul>
			</Box>

			<Heading>What's the plan?</Heading>

			<Grid>
				<TimelineItem icon={<FaPlaneArrival size={16} />} title={titleFormat(BACHELOR_PARTY_DATE)}>
					<ul>
						<li>
							04:00pm: Get to the Airbnb. Let me or Ross know if you need picked up from the airport and we'll figure
							out picking you up.
						</li>
						<li>06:00pm: Order a ton of pizza</li>
						<li>07:00pm: Games. So many games. WV Rules</li>
						<li>??:??am: Sleep</li>
					</ul>
				</TimelineItem>

				<TimelineItem icon={<FaShip size={16} />} title={titleFormat(addDays(BACHELOR_PARTY_DATE, 1))}>
					<ul>
						<li>09:00am: Wake up</li>
						<li>09:30am: Jay makes breakfast</li>
						<li>11:00am: Uber to Boat. Address: 238 W Station Square Drive</li>
						<li>11:45am: Get briefed on boat details</li>
						<li>12:00pm: Get on boat</li>
						<li>02:00pm: Get off boat</li>
						<li>02:01pm: Go to Station Square Subway Station and go North</li>
						<li>02:20pm: Get off at Steel Plaza Station</li>
						<li>02:30pm: Go to our Apartment. Address: 434 Fifth Avenue</li>
						<li>03:00pm: Rooftop party. Grill out</li>
						<li>03:30pm: Swim, Basketball, Flip Cup, Shuffleboard, etc.</li>
						<li>06:00pm: Party Bus arrives. Go back to Airbnb</li>
						<li>
							06:30pm: Shit, shower, shave, <Link href='https://www.youtube.com/watch?v=spOq3wIO9mk&t=1s'>shamone</Link>
						</li>
						<li>07:30pm: Get back on the party bus</li>
						<li>08:00pm: Barcadia. Address: 24 Market Square</li>
						<li>09:30pm: Cheerleaders. Address: 3100 Liberty Ave</li>
						<li>10:29pm: Party Bus arrives. Go back to Airbnb</li>
						<li>11:00pm: Games</li>
						<li>??:??am: Sleep</li>
					</ul>
				</TimelineItem>

				<TimelineItem icon={<FaGolfBall size={16} />} title={titleFormat(addDays(BACHELOR_PARTY_DATE, 2))}>
					<ul>
						<li>10:00am: Wake up</li>
						<li>11:15pm: Carpool to TopGolf</li>
						<li>12:00pm: TopGolf (eat here)</li>
						<li>02:00pm: Carpool back to Airbnb</li>
						<li>02:30pm: Lunch/Nap</li>
						<li>??:??pm: Guitar Hero / Rockband</li>
						<li>??:??pm: Dance Dance Revolution</li>
						<li>??:??pm: Mario Kart Drunk Driving</li>
						<li>??:??pm: Flip Cup</li>
						<li>??:??pm: Beer Pong</li>
						<li>??:??pm: Someone microwaves bagel bites and nuggets</li>
						<li>??:??pm: Circle of Death</li>
						<li>??:??pm: Cutthroat</li>
						<li>??:??am: Cricket</li>
						<li>??:??pm: Ride the Bus</li>
						<li>??:??pm: Taskmaster/Minute to win it</li>
					</ul>
				</TimelineItem>

				<TimelineItem icon={<FaPlaneDeparture size={16} />} title={titleFormat(addDays(BACHELOR_PARTY_DATE, 3))}>
					<ul>
						<li>09:30am: Clean up Airbnb</li>
						<li>11:00am: Checkout of Airbnb</li>
					</ul>
				</TimelineItem>
			</Grid>

			<Heading>How much will this cost?</Heading>

			<Text>
				~$150-225 per night. Depends on how many people make it for how many nights. I'm covering the Airbnb myself, and
				asking everyone to split the party bus, the boat, TopGolf reservation, and the food/supplies. Please bring
				whatever you want/can to drink/share. I'll have a spreadsheet that I'll share with everyone to show the math of
				how it's split up. You can just Venmo me your share, and I'll mark you as paid in the spreadsheet.
			</Text>

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
			<Box w='100%' sx={{ aspectRatio: '1' }} borderRadius='12px' overflow='hidden'>
				<iframe
					src='https://open.spotify.com/embed/playlist/0NtmLAIC2FXFVAe5rlIKlX?utm_source=generator&theme=0'
					width='100%'
					height='150%'
					allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
					loading='lazy'
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
			<video controls>
				<source src='PartyElephant.webm' type='video/webm' />
			</video>
		</>
	)
}
