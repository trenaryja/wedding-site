import { Grid } from '@chakra-ui/react'
import OurDate from '~/components/OurDate'
import OurNames from '~/components/OurNames'

export default function Index() {
	return (
		<Grid py={10} my={40} gap={40}>
			<OurNames />
			<OurDate maxW='xs' />
		</Grid>
	)
}
