import { Box, Container, Text, useTheme } from '@chakra-ui/react'

export default function Footer() {
	const theme = useTheme()
	return (
		<Box as='footer' mt='auto'>
			<Container minW='xs' d='flex' justifyContent='space-around' alignItems='center' flexDir={['column', 'row']}>
				<Text my={10}>
					Made with{' '}
					<Text as='span' color='transparent' textShadow={`0 0 0 ${theme.colors.white}`}>
						❤️
					</Text>{' '}
					by Justin Trenary
				</Text>
			</Container>
		</Box>
	)
}
