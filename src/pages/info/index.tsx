import { Button, Heading, Link, VStack } from '@chakra-ui/react'
import { useTheme } from '../../utils'

export default function Index() {
	const theme = useTheme()
	return (
		<VStack w='100%'>
			<Heading>Location:</Heading>

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

			<Link href='https://goo.gl/maps/hkVZ9aS4jdGXyFKR8'>
				<Button>Get Directions</Button>
			</Link>
		</VStack>
	)
}
