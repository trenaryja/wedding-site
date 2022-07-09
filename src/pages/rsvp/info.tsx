import { Button, Heading, Image, Link, Text, VStack } from '@chakra-ui/react'

export default function Info() {
	return (
		<VStack>
			<Heading>Why enter your number?</Heading>
			<Text>I will fill this out later. In the meantime...</Text>
			<Image src='https://i.giphy.com/media/UqZ4imFIoljlr5O2sM/giphy.webp' alt='Shia Do It' />
			<Link href='/rsvp'>
				<Button>Back To RSVP</Button>
			</Link>
		</VStack>
	)
}
