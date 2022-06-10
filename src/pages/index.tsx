import { Flex } from '@chakra-ui/react'
import Gallery from '../components/Gallery'
import OurDate from '../components/OurDate'
import OurNames from '../components/OurNames'

const Index = () => (
	<Flex my={20} gap={20} flexDir='column' alignItems='center' justifyContent='center'>
		<OurNames />
		<OurDate maxW='sm' />
		<Gallery />
	</Flex>
)

export default Index
