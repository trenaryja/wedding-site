import { Flex, Text } from '@chakra-ui/react'
import { useTheme } from '../utils/theme'

export default function Footer() {
	const theme = useTheme()
	return (
		<Flex as='footer' justifyContent='space-around' alignItems='center' mt='auto'>
			<Text my={10}>
				Made with
				<Text as='span' color='transparent' textShadow={`0 0 0 ${theme.colors.white}`}>
					{' ❤️ '}
				</Text>
				by Justin Trenary
			</Text>
		</Flex>
	)
}
