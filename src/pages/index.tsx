import { Gallery, OurDate, OurNames } from '@/components'
import { WEDDING_DATE, limelight } from '@/utils'
import { Grid, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { format } from 'date-fns'

const Index = () => (
	<>
		<Grid
			pt={30}
			filter='grayscale(1)'
			backgroundImage='url(engagement.webp)'
			backgroundSize='cover'
			backgroundPosition='top'
			className='full-bleed'
			position='relative'
			placeItems='center'
			gap={10}
			p={5}
		>
			<OurNames />
			<OurDate
				maxW='xs'
				zIndex={1}
				lines={[
					{ text: format(WEDDING_DATE, 'M/d/y'), props: { fontWeight: 900 } },
					{ text: format(WEDDING_DATE, 'EEEE'), props: { fontWeight: 50 } },
					{ text: format(WEDDING_DATE, 'MMMM'), props: { fontWeight: 500 } },
					{ text: format(WEDDING_DATE, 'do'), props: { fontWeight: 900 } },
					{ text: format(WEDDING_DATE, 'y'), props: { fontWeight: 500 } },
				]}
				fill='white'
				props={{ fontFamily: limelight.style.fontFamily }}
			/>
		</Grid>
		<Tabs isFitted colorScheme='gray' className='full-bleed' p={5}>
			<TabList>
				<Tab>Friends & Family</Tab>
				<Tab>Just Us</Tab>
			</TabList>
			<TabPanels>
				<TabPanel px={0} py={1}>
					<Gallery albumId='ZY34btqj5Fk1LZBt9' />
				</TabPanel>
				<TabPanel px={0} py={1}>
					<Gallery albumId='3E4AiRUXRaRi8GzGA' />
				</TabPanel>
			</TabPanels>
		</Tabs>
	</>
)

export default Index
