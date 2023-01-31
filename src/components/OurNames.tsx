import { VStack } from '@chakra-ui/react'
import { HoverText, HoverTextProps } from '.'

const Line = ({ children }: HoverTextProps) => (
	<HoverText heading textAlign='center' size='4xl'>
		{children}
	</HoverText>
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
