import { Flex, Text } from '@chakra-ui/react'

export const Footer = () => {
	return (
		<Flex as='footer' p={5} className='full-bleed' justifyContent='space-around' bg='blackAlpha.500' mt={10}>
			<Text>
				Made with
				<Text as='span' color='transparent' textShadow={`0 0 0 #FFF`}>
					{' ❤️ '}
				</Text>
				by Justin Trenary
			</Text>
		</Flex>
	)
}
