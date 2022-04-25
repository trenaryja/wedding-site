import type { TextProps } from '@chakra-ui/react'
import { Box, Heading } from '@chakra-ui/react'

const Line = ({ children }: TextProps) => (
	<Heading textAlign='center' size='3xl'>
		{children}
	</Heading>
)

export default function OurNames() {
	return (
		<Box>
			<Line>Rachel</Line>
			<Line>&</Line>
			<Line>Justin</Line>
		</Box>
	)
}
