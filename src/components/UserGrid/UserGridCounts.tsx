import { Grid, Heading, StackProps, Text, VStack } from '@chakra-ui/react'
import { Table } from '@tanstack/react-table'
import { NotionUser } from '../../utils/notion'

export type UserGridFooterProps = {
	table: Table<NotionUser>
}

const Count = ({ label, value, ...rest }: { label: string; value: number } & StackProps) => (
	<VStack {...rest}>
		<Text whiteSpace='nowrap'>{label}</Text>
		<Heading>{value}</Heading>
	</VStack>
)

export const UserGridCounts = ({ table }: UserGridFooterProps) => (
	<Grid
		px={5}
		columnGap={20}
		rowGap={5}
		templateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']}
		justifyContent='space-around'
	>
		<Count label='Invites' value={table.getRowModel().rows.length} />
		<Count
			label='Plus Ones'
			value={
				table.getRowModel().rows.filter((x) => x.original.properties.Tags.multi_select.some((x) => x.name === '+1'))
					.length
			}
		/>
		<Count
			label='Attending'
			value={table
				.getRowModel()
				.rows.reduce(
					(total, x) =>
						total +
						(x.original.properties.IsAttending.checkbox === true ? 1 : 0) +
						(x.original.properties.IsPlusOneAttending.checkbox === true ? 1 : 0),
					0,
				)}
		/>
		<Count
			label='Not Attending'
			value={table
				.getRowModel()
				.rows.reduce(
					(total, x) =>
						total +
						(x.original.properties.IsNotAttending.checkbox === true
							? x.original.properties.Tags.multi_select.some((x) => x.name === '+1')
								? 2
								: 1
							: x.original.properties.IsAttending.checkbox === true &&
								  x.original.properties.IsPlusOneAttending.checkbox === false &&
								  x.original.properties.Tags.multi_select.some((x) => x.name === '+1')
								? 1
								: 0),
					0,
				)}
		/>
		<Count
			label='TBD'
			value={table
				.getRowModel()
				.rows.reduce(
					(total, x) =>
						total +
						(x.original.properties.IsAttending.checkbox === false &&
						x.original.properties.IsNotAttending.checkbox === false
							? x.original.properties.Tags.multi_select.some((x) => x.name === '+1')
								? 2
								: 1
							: 0),
					0,
				)}
		/>
		<Count
			label='Invited'
			value={table.getRowModel().rows.reduce((total, x) => {
				return total + (x.original.properties.LastContacted.date !== null ? 1 : 0)
			}, 0)}
		/>
		<Count
			label='Missing #'
			value={table.getRowModel().rows.reduce((total, x) => {
				return total + (x.original.properties.Phone.phone_number === null ? 1 : 0)
			}, 0)}
		/>
		<Count
			label='Confirmed +1s'
			value={table.getRowModel().rows.reduce((total, x) => {
				return total + (x.original.properties.IsPlusOneAttending.checkbox === true ? 1 : 0)
			}, 0)}
		/>
	</Grid>
)
