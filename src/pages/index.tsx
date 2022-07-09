import { VStack } from '@chakra-ui/react'
import Gallery from '../components/Gallery'
import OurDate from '../components/OurDate'
import OurNames from '../components/OurNames'

const Index = () => (
	<VStack mt={20} gap={20}>
		<OurNames />
		<OurDate maxW='sm' />
		<Gallery />
	</VStack>
)

export default Index
