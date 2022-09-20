import { Image, VStack } from '@chakra-ui/react'
import Gallery from '../components/Gallery'
import OurDate from '../components/OurDate'
import OurNames from '../components/OurNames'

const Index = () => (
	<VStack mt={20} gap={20} w='100%'>
		<VStack position='relative' w='100%' gap={10}>
			<Image
				alt='Rachel & Justin'
				position='absolute'
				top={0}
				left={0}
				width='100%'
				height='100%'
				src='engagement.jpg'
				objectFit='cover'
				backgroundPosition='center'
				filter='grayscale(1) brightness(.5)'
			/>
			<OurNames />
			<OurDate maxW='xs' zIndex={1} />
		</VStack>
		<Gallery />
	</VStack>
)

export default Index
