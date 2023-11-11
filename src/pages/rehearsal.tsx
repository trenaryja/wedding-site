import { Button, Grid, Heading, Image, Link, Text } from '@chakra-ui/react'
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa'

export default function Index() {
	return (
		<>
			<Image rounded='3xl' src='Engagement-276.jpg' alt='Rachel & Justin' />
			<Heading pt={10}>Rehearsal Details</Heading>
			<Text>Our rehearsal is at the Roxian Theatre on</Text>
			<Text fontWeight='bold'>Friday, Novemeber 17th from 5:00pm - 7:00pm.</Text>
			<Text>Address: 425 Chartiers Ave, McKees Rocks, PA 15136</Text>
			<Link href='https://goo.gl/maps/hkVZ9aS4jdGXyFKR8' target='_blank'>
				<Button leftIcon={<FaMapMarkerAlt />}>Click here to get directions</Button>
			</Link>

			<Link
				target='_blank'
				href='https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=N24ydmZzOHM5dmk3aGhxMzcydmgzZGVobGogdHJlbmFyeS5sb3ZlQG0&tmsrc=trenary.love%40gmail.com'
			>
				<Button leftIcon={<FaCalendar />}>Click here to add the Rehearsal to your Calendar</Button>
			</Link>

			<Heading pt={10}>Rehearsal Dinner Details</Heading>
			<Text>After our rehearsal, we would like to treat everyone to dinner at the Grand Concourse restaurant on</Text>
			<Text fontWeight='bold'>Friday, Novemeber 17th from 8:00pm - 10:00pm.</Text>
			<Text>Address: 100 W Station Square Dr, Pittsburgh, PA 15219</Text>
			<Link href='https://maps.app.goo.gl/cRSXe7twaWyGFb5t9' target='_blank'>
				<Button leftIcon={<FaMapMarkerAlt />}>Click here to get directions</Button>
			</Link>
			<Link
				target='_blank'
				href='https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MG9uZ2JhcXVzMTl2dTVuZ3JxaGM5NGgwcmggdHJlbmFyeS5sb3ZlQG0&tmsrc=trenary.love%40gmail.com'
			>
				<Button leftIcon={<FaCalendar />}>Click here to add the Rehearsal Dinner to your Calendar</Button>
			</Link>

			<Heading pt={10}>What to Expect?</Heading>
			<Heading size='md'>For Rehearsal</Heading>
			<Text>
				Our rehearsal will be the time to do a few run throughs of the ceremony. We'd like this practice to feel as real
				as possible, so we're planning to dress up (black and white, a little formal). It might help us be in the right
				state of mind if you were able to do the same!
			</Text>
			<Text>
				It's also time that we're able to setup for the following day. Since there are no events happening at the Roxian
				Theatre between the rehearsal and the actual wedding, we're able to setup and leave everything there to make
				life a bit easier the next day. We may ask for some assistance with getting everything setup, but we'll
				coordinate day-of as a team! Please help us take photos, and share them with us. This day is particularly
				special to us.
			</Text>

			<Text>
				We'll have a few snacks and drinks ready at the rehearsal. But save some room for the rehearsal dinner!
			</Text>

			<Heading size='md'>For Dinner</Heading>
			<Text>
				After the rehearsal, we'll be heading back to the Sheraton hotel to freshen up. Our location for dinner (the
				Grand Concourse) is a less than five minute walk from the hotel. If you'd like to join us on the walk over, you
				can meet us in the lobby at 7:45pm, and we'll head over at 7:50pm.
			</Text>
			<Text>
				We have reserved space in the Garden Room for our group. Dinner will be served cocktail style, very similar to
				the wedding reception. So we'll have a few tables reserved for seating, but we're hoping to spend most of the
				time standing and roaming around in order to catch up with everyone. We also want to be sure to grab a group
				photo before we all head back to our hotels for the night.
			</Text>
			{/* Embed an mp4 as a looping gif */}
			<Grid placeItems='center' pt={10}>
				<video autoPlay muted loop style={{ width: '50%', borderRadius: '100%' }}>
					<source src='catana-propose.mp4' type='video/mp4' />
				</video>
			</Grid>
		</>
	)
}
