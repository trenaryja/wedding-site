import { Button, Grid, HStack, Heading, Image, Link, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa'
import { GoNorthStar } from 'react-icons/go'
import { IoLogoVenmo } from 'react-icons/io5'
import { CarouselGallery } from '../components'
import { JUSTIN_VENMO, RACHEL_VENMO, WEDDING_DATE, useTheme } from '../utils'

// TODO: Headings:
// - Schedule - Timing
// - Where to stay
// - Shuttle/Transportation info
// - What will the food/drinks be
// - What will the music be
// - What will the after party be

const StarInfo = ({ children }: { children: string }) => (
	<Text as='span' display='inline-flex' alignItems='center' gap={1}>
		<GoNorthStar />
		{children}
		<GoNorthStar />
	</Text>
)

export default function Index() {
	const theme = useTheme()

	return (
		<>
			<Image
				w='100%'
				borderRadius='3xl'
				src='https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGJmazI1cnR5bjQ2cG93Nnh5ZHE2dGFydTJienkwbGhvNGk4dzJuciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3otPoKL4aHT3npyLGU/giphy.gif'
				alt='dancing'
			/>

			<Heading>When?</Heading>
			<Text>
				<Text fontSize='2xl' fontWeight='bold'>
					{format(WEDDING_DATE, 'MM/dd/yyyy')}: The Saturday before Thanksgiving
				</Text>
				Exact time TBD, but the venue will likely be open at 5pm, with the ceremony will start at 6pm.
			</Text>

			<Link
				target='_blank'
				href='https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=MDZ2MzJxNmRjM3RpN2trYnVrOWNsMXYzbTAgdHJlbmFyeS5sb3ZlQG0&amp;tmsrc=trenary.love%40gmail.com'
			>
				<Button leftIcon={<FaCalendar />}>Click here to add to your Calendar</Button>
			</Link>

			<Heading>Where?</Heading>
			<Text>The ceremony and reception will both be held at the Roxian Theatre</Text>
			<Text>Address: 425 Chartiers Ave, McKees Rocks, PA 15136</Text>
			<Link href='https://goo.gl/maps/hkVZ9aS4jdGXyFKR8' target='_blank'>
				<Button leftIcon={<FaMapMarkerAlt />}>Click here to get directions</Button>
			</Link>

			{/* TODO: image carousel of Roxian */}

			<iframe
				style={{
					borderRadius: theme.radii['3xl'],
					height: theme.sizes.md,
					width: '100%',
					filter: 'grayscale(.5)',
				}}
				title='map'
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.4811941454795!2d-80.06114388455859!3d40.46461837935958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8834f5cbfef83f51%3A0xf0f16a3405aab864!2sRoxian%20Theatre!5e0!3m2!1sen!2sus!4v1673167366206!5m2!1sen!2sus'
			/>

			<Text>
				There will be a shuttle available to transport you from the{' '}
				<Link href='#hotel'>Sheraton Pittsburgh Hotel at Station Square</Link> to the wedding venue (and back), but if
				you'd rather drive yourself there will be plenty of free parking available! Below is an aerial view of the
				venue, and the areas highlighted in green are available for parking:
			</Text>

			<Image src='parking-map.webp' alt='parking map' borderRadius='3xl' />

			<Heading id='hotel'>What Hotel?</Heading>

			<Text>Sheraton Pittsburgh Hotel at Station Square</Text>
			<Text>Address: 300 W Station Square Dr, Pittsburgh, PA 15219</Text>
			<Link href='https://goo.gl/maps/uLaMmEuRCvS9Vb5Q7' target='_blank'>
				<Button leftIcon={<FaMapMarkerAlt />}>Click here to get directions</Button>
			</Link>

			{/* TODO: add gcal link: */}
			<Text>
				Reserve your room by calling <Link href='tel:4122612000'>412-261-2000</Link> & requesting a room in the
				Hamilton/Trenary Wedding Room Block. This hotel fills up quick so be sure to call soon and lock your room in
				before <StarInfo>October 10th!</StarInfo>
			</Text>

			<Text>
				If you miss the block or just prefer a different vibe of a hotel, no worries! A few of our favorites are below
				to help you narrow your search.
			</Text>

			<Grid px={10} gap={5}>
				<Grid gap={2}>
					<Text>Joinery Hotel Pittsburgh, Curio Collection by Hilton</Text>
					<Text>453 Boulevard of the Allies, Pittsburgh, PA 15219</Text>
					<Link href='https://maps.app.goo.gl/13Yanqds3C43puLt8' target='_blank'>
						<Button size='sm' leftIcon={<FaMapMarkerAlt />}>
							Click here to get directions
						</Button>
					</Link>
				</Grid>
				<Grid gap={2}>
					<Text>Even Hotel Pittsburgh Downtown, an IHG Hotel</Text>
					<Text>425 Forbes Ave, Pittsburgh, PA 15219 </Text>
					<Link href='https://maps.app.goo.gl/CfGNModu5GwaBJXE8' target='_blank'>
						<Button size='sm' leftIcon={<FaMapMarkerAlt />}>
							Click here to get directions
						</Button>
					</Link>
				</Grid>
				<Grid gap={2}>
					<Text>SpringHill Suites by Marriott Pittsburgh Southside Works</Text>
					<Text>2950 S Water St, Pittsburgh, PA 15203</Text>
					<Link href='https://maps.app.goo.gl/1SWcJ22oojoHX4G68' target='_blank'>
						<Button size='sm' leftIcon={<FaMapMarkerAlt />}>
							Click here to get directions
						</Button>
					</Link>
				</Grid>
			</Grid>

			{/* TODO: Image carousel of hotel */}

			<Heading>What to Expect?</Heading>
			<Text>
				We love your kids, but heads up: this is an adult-only event. <StarInfo>21+ ONLY!</StarInfo>
			</Text>

			<Text>
				We're so excited for you to join us for our big day! Expect our venue to open about an hour before our ceremony
				starts for snacks, drinks, and mingling. Heads up, since this is a LiveNation concert venue, there will be a
				quick security check when you arrive, just to be sure everyone is safe. After the ceremony, expect to grab a few
				apps and drinks during a cocktail hour while we take pictures of the wedding party.
			</Text>
			<Text>
				Our reception is next, with a photo booth, food stations, and a DJ playing music. You better dance. Dance like
				you've never danced before. And (another heads up) while we'll have a few tables and chairs, we're not assigning
				seats. We prefer to have folks moving and grooving as much as possible, but you will be able to rest and set
				your belongings down. Expect a few speeches. Expect Justin to cry. And lastly, expect this section to get
				updates as we get closer to the day, so please check back often!
			</Text>

			<Text>Here's a very loose agenda for the evening. Keep in mind, these times are also subject to change.</Text>

			<ul>
				<li>05:00pm: Doors open at Roxian Theatre, and first shuttle picks up at the Sheraton</li>
				<li>05:30pm: Second shuttle picks up at the Sheraton</li>
				<li>06:00pm: Ceremony</li>
				<li>06:30pm: Cocktail Hour</li>
				<li>07:30pm: Reception with dinner, drinks, and dancing!</li>
				<li>10:30pm: First shuttle picks up at Roxian Theatre</li>
				<li>11:00pm: Last shuttle picks up at the Roxian Theatre</li>
			</ul>

			<Heading>What to Wear?</Heading>

			<Text>
				We're going with a Black & White and/or Grayscale theme. This doesn't mean you can't wear colors though (except
				a white dress...maybe don't wear a white dress, Rachel already called it)! We're hoping to see some splashes of
				color here and there! The theme is only a suggestion, and you probably already have something that will work. We
				want you to feel and look your best, and we plan on taking lots of group photos. Dresses, rompers, gowns, suits,
				fancy sweaters, button up shirts, are encouraged. Here are some inspiration pics that we grouped together to
				help share the vibe!
			</Text>

			<CarouselGallery
				images={[
					'https://images.unsplash.com/photo-1591950527772-611902699c4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75',
					'https://images.unsplash.com/photo-1487164567831-a30e5a5a4366?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75',
					'https://images.unsplash.com/photo-1589911949435-718743b6032c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75',
					'https://images.unsplash.com/photo-1614786269829-d24616faf56d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75',
					'https://images.unsplash.com/photo-1495994132590-5c7b6c4fffec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75',
					'https://images.unsplash.com/photo-1500637883394-da696c7d2ed2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75',
					'https://images.unsplash.com/photo-1551978115-224094c5c28e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75',
					'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75',
					'https://images.unsplash.com/photo-1603840440598-eec186f9f336?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75',

					'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75',
					'https://images.unsplash.com/photo-1598032895468-e81825029202?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75',
					'https://images.unsplash.com/photo-1517467069232-26eee2e331b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75',
					'https://images.unsplash.com/photo-1616015188998-53a4629fdd39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75',
					'https://images.unsplash.com/photo-1581382575275-97901c2635b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75',
					'https://images.unsplash.com/photo-1630667208073-82d53b1db540?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75	',
				]}
			/>

			<Heading>What to Bring?</Heading>
			<Text>
				We're only asking for you to attend, we promise that we do not want actual gifts. We aren't registered anywhere.
				We don't have an Amazon wishlist. We don't want things. The best gift you could give us is your presence. If you
				feel inclined to give us something, then we would love a card with a personal note inside, or just feel free to
				leave a message in the RSVP page of the website!
			</Text>
			<Text>
				If you can't be convinced to not give a gift, we sincerely request that you don't get us any physical gifts. If
				you've seen our apartment, you know we're pretty minimal. Through the 10 years we've been together, we've
				accumulated all the home things we need. We are linking our Venmo accounts below. Please do not feel obligated
				to give us anything, we are just happy to have you there!
			</Text>

			<HStack w='100%' justify='center'>
				<Link target='_blank' href={RACHEL_VENMO}>
					<Button leftIcon={<IoLogoVenmo />}>Rachel's Venmo</Button>
				</Link>
				<Link target='_blank' href={JUSTIN_VENMO}>
					<Button leftIcon={<IoLogoVenmo />}>Justin's Venmo</Button>
				</Link>
			</HStack>
		</>
	)
}
