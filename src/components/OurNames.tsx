import { Heading, HeadingProps, VStack } from '@chakra-ui/react'

const Line = ({ children }: HeadingProps) => (
	<Heading textAlign='center' size='4xl'>
		{children}
	</Heading>
)

export const OurNames = () => {
	return (
		<VStack>
			<Line>Rachel</Line>
			<Line>&</Line>
			<Line>Justin</Line>
		</VStack>
	)
}
