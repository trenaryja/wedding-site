import { Grid } from '@chakra-ui/react'
import Gallery from '~/components/Gallery'
import OurDate from '~/components/OurDate'
import OurNames from '~/components/OurNames'

export default function Index() {
	return (
		<Grid my={20} gap={20} justifyContent='center'>
			<OurNames />
			<OurDate />
			<Gallery />
		</Grid>
	)
}
