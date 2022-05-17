import type { BoxProps } from '@chakra-ui/react'
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import useCountdown from '~/hooks/useCountDown'

const WEDDING_DATE = new Date('2023-11-18T05:00:00.000Z')
// const WEDDING_DATE = new Date(new Date().getTime() + 3000)

const DateValue = ({ value, label }: { value: number | undefined; label: string }) => (
	<VStack>
		<Heading>{value ?? 0}</Heading>
		<Text>{label}</Text>
	</VStack>
)

export default function CountDown(props: BoxProps) {
	const [days, hours, minutes] = useCountdown(WEDDING_DATE)
	return (
		<Box d='flex' justifyContent='center' {...props}>
			<HStack w='full' justifyContent='space-around' divider={<Text px={2}>|</Text>}>
				<DateValue label='days' value={days} />
				<DateValue label='hours' value={hours} />
				<DateValue label='minutes' value={minutes} />
			</HStack>
		</Box>
	)
}
