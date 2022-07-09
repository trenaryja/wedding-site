import { VStack } from '@chakra-ui/react'
import HoverText, { HoverTextProps } from './HoverText'

const Line = ({ children }: HoverTextProps) => (
	<HoverText heading hoverBg='green.700' textAlign='center' size='4xl'>
		{children}
	</HoverText>
)

export default function OurNames() {
	return (
		<VStack>
			<Line>Rachel</Line>
			<Line>&</Line>
			<Line>Justin</Line>
		</VStack>
	)
}
