import { Button, Flex, Heading, Link } from '@chakra-ui/react'

export default function Index() {
	return (
		<Flex textAlign='center' my={20} gap={5} flexDir='column' alignItems='center' justifyContent='center'>
			<Heading my={5}>Location:</Heading>

			<iframe
				title='map'
				src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3036.400688727804!2d-79.9921213!3d40.4442677!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8834f3e203155389%3A0xab3d797cbc95e2d9!2sThe%20Grand%20Hall%20at%20The%20Pennsylvanian!5e0!3m2!1sen!2sus!4v1656912875889!5m2!1sen!2sus'
				width='100%'
				height={640 - 32}
			/>

			<Link href='https://goo.gl/maps/shUnofrBwKH6HZPF6'>
				<Button>Get Directions</Button>
			</Link>
		</Flex>
	)
}
