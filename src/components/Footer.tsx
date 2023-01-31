import { Flex, Text } from '@chakra-ui/react'

export const Footer = () => {
	return (
		<Flex as='footer' justifyContent='space-around' alignItems='center' mt='auto'>
			<Text my={10}>
				Made with
				<Text as='span' color='transparent' textShadow={`0 0 0 #FFF`}>
					{' ❤️ '}
				</Text>
				by Justin Trenary
			</Text>
		</Flex>
	)
}
