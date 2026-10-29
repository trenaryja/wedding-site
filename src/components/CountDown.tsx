import { useCountdown } from '@/hooks'
import { WEDDING_DATE } from '@/utils'
import { Heading, HStack, Text, VStack } from '@chakra-ui/react'

const DateValue = ({ value = 0, label }: { value: number | undefined; label: string }) => (
	<VStack>
		<Heading>{value}</Heading>
		<Text>{label}</Text>
	</VStack>
)

export const CountDown = () => {
	const [days, hours, minutes] = useCountdown(WEDDING_DATE)
	return (
		<HStack justifyContent='space-around' divider={<Text px={2}>|</Text>}>
			<DateValue label='days' value={days} />
			<DateValue label='hours' value={hours} />
			<DateValue label='minutes' value={minutes} />
		</HStack>
	)
}
