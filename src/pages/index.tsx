import { Image, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react'
import { format } from 'date-fns'
import Gallery from '../components/Gallery'
import ScaledText from '../components/OurDate'
import OurNames from '../components/OurNames'
import { WEDDING_DATE } from '../utils'

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
				src='engagement.png'
				objectFit='cover'
				backgroundPosition='center'
				filter='grayscale(1) brightness(.75)'
			/>
			<OurNames />
			<ScaledText
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
				props={{ fontFamily: 'Limelight' }}
			/>
		</VStack>
		<Tabs isFitted isLazy w='100%' colorScheme='gray'>
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
	</VStack>
)

export default Index
