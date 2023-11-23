import { Box, Grid, Heading } from '@chakra-ui/react'

export type TimelineItemProps = {
	title: string
	children: React.ReactNode
	icon: React.ReactNode
}

export const TimelineItem = ({ title, children, icon }) => {
	return (
		<Grid alignItems='center' templateColumns='auto 1fr'>
			<Box borderRadius='full' borderWidth={3} p={4}>
				{icon}
			</Box>
			<Heading pl={4} size='md'>
				{title}
			</Heading>
			<Box p={5} justifySelf='center' borderRightWidth={3} borderRadius='full' height='100%' width={0} />
			<Box>{children}</Box>
		</Grid>
	)
}
