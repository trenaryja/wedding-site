import type { Properties } from '@/utils'
import type { StackProps } from '@chakra-ui/react'
import { Grid, Heading, Text, VStack } from '@chakra-ui/react'
import type { UserTable } from '.'

export type UserGridCountsProps = {
	table: UserTable
}

const Count = ({ label, value, ...rest }: StackProps & { label: string; value: number }) => (
	<VStack {...rest}>
		<Text whiteSpace='nowrap'>{label}</Text>
		<Heading>{value}</Heading>
	</VStack>
)

const hasPlusOne = (properties: Properties) => properties.Tags.multi_select.some((tag) => tag.name === '+1')

const notAttendingCount = (guest: Properties) => {
	if (guest.IsNotAttending.checkbox) return hasPlusOne(guest) ? 2 : 1
	return guest.IsAttending.checkbox && !guest.IsPlusOneAttending.checkbox && hasPlusOne(guest) ? 1 : 0
}

export const UserGridCounts = ({ table }: UserGridCountsProps) => {
	const guests = table.getRowModel().rows.map((row) => row.original.properties)
	const countWhere = (predicate: (properties: Properties) => boolean) => guests.filter(predicate).length
	const sum = (count: (properties: Properties) => number) => guests.reduce((total, guest) => total + count(guest), 0)

	return (
		<Grid
			px={5}
			columnGap={20}
			rowGap={5}
			templateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']}
			justifyContent='space-around'
		>
			<Count label='Invites' value={guests.length} />
			<Count label='Plus Ones' value={countWhere(hasPlusOne)} />
			<Count
				label='Attending'
				value={sum((guest) => Number(guest.IsAttending.checkbox) + Number(guest.IsPlusOneAttending.checkbox))}
			/>
			<Count label='Not Attending' value={sum(notAttendingCount)} />
			<Count
				label='TBD'
				value={sum((guest) =>
					guest.IsAttending.checkbox || guest.IsNotAttending.checkbox ? 0 : hasPlusOne(guest) ? 2 : 1,
				)}
			/>
			<Count label='Invited' value={countWhere((guest) => guest.LastContacted.date !== null)} />
			<Count label='Missing #' value={countWhere((guest) => guest.Phone.phone_number === null)} />
			<Count label='Confirmed +1s' value={countWhere((guest) => guest.IsPlusOneAttending.checkbox)} />
		</Grid>
	)
}
