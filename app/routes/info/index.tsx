import { Button, Flex, Heading, Link } from '@chakra-ui/react'

export default function Index() {
	return (
		<Flex my={20} gap={5} flexDir='column' alignItems='center' justifyContent='center'>
			<Heading my={5}>Location:</Heading>
			<iframe
				title='map'
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.4810097042123!2d-80.06114388436875!3d40.46462246064887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8834f5cbfef83f51%3A0xf0f16a3405aab864!2sRoxian%20Theatre!5e0!3m2!1sen!2sus!4v1652932910495!5m2!1sen!2sus'
				width='100%'
				height={640 - 32}
			/>
			<Link href='https://maps.google.com/maps/dir//Roxian+Theatre+425+Chartiers+Ave+McKees+Rocks,+PA+15136/@40.4646184,-80.0589552,17z/data=!4m5!4m4!1m0!1m2!1m1!1s0x8834f5cbfef83f51:0xf0f16a3405aab864'>
				<Button>Get Directions</Button>
			</Link>
		</Flex>
	)
}
