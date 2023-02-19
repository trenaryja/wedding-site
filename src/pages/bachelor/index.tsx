import { Box, Image, Text, VStack } from '@chakra-ui/react'
import { Timeline } from '@mantine/core'
import { addDays, format } from 'date-fns'
import { FaFemale, FaPlaneArrival, FaPlaneDeparture, FaShip } from 'react-icons/fa'
import { BACHELOR_PARTY_DATE } from '../../utils'

const titleFormat = (date: Date) => format(date, 'M/d - eeee').toUpperCase()

export default function Index() {
	return (
		<VStack>
			<Timeline bulletSize={32} lineWidth={2} py={20}>
				<Timeline.Item bullet={<FaPlaneArrival size={16} />} title={titleFormat(BACHELOR_PARTY_DATE)}>
					<Text>Day one</Text>
				</Timeline.Item>

				<Timeline.Item bullet={<FaShip size={16} />} title={titleFormat(addDays(BACHELOR_PARTY_DATE, 1))}>
					<Text>Day two</Text>
				</Timeline.Item>

				<Timeline.Item bullet={<FaFemale size={16} />} title={titleFormat(addDays(BACHELOR_PARTY_DATE, 2))}>
					<Text>Day three</Text>
				</Timeline.Item>

				<Timeline.Item bullet={<FaPlaneDeparture size={16} />} title={titleFormat(addDays(BACHELOR_PARTY_DATE, 3))}>
					<Text>Day four</Text>
				</Timeline.Item>
			</Timeline>

			<Image src='asanisimasa.webp' alt='asanisimasa' />

			<Image src='dickarm.svg' alt='dick arm' p={10} w='100%' />

			<Box maxW='720px' m='0 auto'>
				<Box pos='relative' pb='75%' height={0}>
					<iframe
						style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
						src='https://www.youtube.com/embed/9jlaZL7CWHY'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen={true}
					></iframe>
				</Box>
			</Box>
		</VStack>
	)
}
