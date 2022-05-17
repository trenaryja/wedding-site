import { Heading } from '@chakra-ui/react'
import Map from '~/components/Map'

export default function Index() {
	return (
		<>
			<Heading my={5}>Location:</Heading>
			<Map />
		</>
	)
}
