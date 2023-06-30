import { Button, Heading, Image, Link, Text } from '@chakra-ui/react'
import { CarouselGallery } from '../../components'
import { useTheme } from '../../utils'

// TODO: Headings:
// - Schedule - Timing
// - Location
// - Parking info
// - Where to stay
// - Shuttle info
// - What to Wear
// - What to Bring / Gifts
// - What will the food/drinks be
// - What will the music be
// - What will the after party be

export default function Index() {
	const theme = useTheme()
	return (
		<>
			<Heading>Location:</Heading>
			<Text>The ceremony and reception will both be held at the Roxian Theatre</Text>
			<Text>Address: 425 Chartiers Ave, McKees Rocks, PA 15136</Text>
			<Link href='https://goo.gl/maps/hkVZ9aS4jdGXyFKR8' target='_blank'>
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
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.4811941454795!2d-80.06114388455859!3d40.46461837935958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8834f5cbfef83f51%3A0xf0f16a3405aab864!2sRoxian%20Theatre!5e0!3m2!1sen!2sus!4v1673167366206!5m2!1sen!2sus'
			/>

			<Text>
				There will be a shuttle available to get take you from the hotel to the wedding venue, but if you'd rather drive
				yourself there will be plenty of free parking available! There will be signs as well as staff on site to help
				direct you to the front doors. Below is an aerial view of the venue, and the areas highlighted in green are
				available for parking:
			</Text>

			<Image src='parking-map.webp' alt='parking map' borderRadius='3xl' />

			<Heading>What to Wear?</Heading>

			<Text>
				We're going with a Black & White and/or Grayscale theme. This doesn't mean you can't wear colors though (except
				a white dress...maybe don't wear a white dress, Rachel already called it)! We're hoping to see some splashes of
				color here and there! The theme is only a suggestion, and you probably already have something that will work. We
				want you to feel and look your best, and we plan on taking lots of group photos. Dresses, rompers, gowns, suits,
				fancy sweaters, button up shirts, are encouraged. Here are some inspiration pics that we grouped together to
				help share the vibe:
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
		</>
	)
}
