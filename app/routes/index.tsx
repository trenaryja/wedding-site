import { Grid } from '@chakra-ui/react'
import Gallery, { links as galleryLinks } from '~/components/Gallery'
import OurDate from '~/components/OurDate'
import OurNames from '~/components/OurNames'

export const links = () => [...galleryLinks()]

export default function Index() {
	return (
		<Grid py={10} my={20} gap={20} justifyContent='center'>
			<OurNames />
			<OurDate maxW='xs' />
			<Gallery />
		</Grid>
	)
}
