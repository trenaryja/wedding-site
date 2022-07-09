import { Box, Image, VStack } from '@chakra-ui/react'

export default function Index() {
	return (
		<VStack>
			<Image src='dickarm.svg' alt='dick arm' p={10} w='100%' />
			<Box maxW='720px' m='0 auto'>
				<Box pos='relative' pb='75%' height={0}>
					<iframe
						style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
						src='https://www.youtube.com/embed/9jlaZL7CWHY'
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen={true}
					></iframe>
				</Box>
			</Box>
		</VStack>
	)
}
