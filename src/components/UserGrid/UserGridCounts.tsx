import type { NotionUser } from '@/utils'
import type { StackProps } from '@chakra-ui/react'
import { Grid, Heading, Text, VStack } from '@chakra-ui/react'
import type { Table } from '@tanstack/react-table'

export type UserGridCountsProps = {
	table: Table<NotionUser>
}

const Count = ({ label, value, ...rest }: StackProps & { label: string; value: number }) => (
	<VStack {...rest}>
		<Text whiteSpace='nowrap'>{label}</Text>
		<Heading>{value}</Heading>
	</VStack>
)

export const UserGridCounts = ({ table }: UserGridCountsProps) => (
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
				table
					.getRowModel()
					.rows.filter((x) => x.original.properties?.Tags?.multi_select?.some((tag) => tag.name === '+1')).length
			}
		/>
		<Count
			label='Attending'
			value={table
				.getRowModel()
				.rows.reduce(
					(total, x) =>
						total +
						(x.original.properties?.IsAttending?.checkbox === true ? 1 : 0) +
						(x.original.properties?.IsPlusOneAttending?.checkbox === true ? 1 : 0),
					0,
				)}
		/>
		<Count
			label='Not Attending'
			value={table.getRowModel().rows.reduce((total, x) => {
				const p = x.original.properties
				if (!p) return total
				const isPlusOne = p.Tags?.multi_select?.some((tag) => tag.name === '+1')
				return (
					total +
					(p.IsNotAttending?.checkbox === true
						? isPlusOne
							? 2
							: 1
						: p.IsAttending?.checkbox === true && p.IsPlusOneAttending?.checkbox === false && isPlusOne
							? 1
							: 0)
				)
			}, 0)}
		/>
		<Count
			label='TBD'
			value={table
				.getRowModel()
				.rows.reduce(
					(total, x) =>
						total +
						(x.original.properties?.IsAttending?.checkbox === false &&
						x.original.properties?.IsNotAttending?.checkbox === false
							? x.original.properties?.Tags?.multi_select?.some((tag) => tag.name === '+1')
								? 2
								: 1
							: 0),
					0,
				)}
		/>
		<Count
			label='Invited'
			value={table.getRowModel().rows.reduce((total, x) => {
				return total + (x.original.properties?.LastContacted?.date !== null ? 1 : 0)
			}, 0)}
		/>
		<Count
			label='Missing #'
			value={table.getRowModel().rows.reduce((total, x) => {
				return total + (x.original.properties?.Phone?.phone_number === null ? 1 : 0)
			}, 0)}
		/>
		<Count
			label='Confirmed +1s'
			value={table.getRowModel().rows.reduce((total, x) => {
				return total + (x.original.properties?.IsPlusOneAttending?.checkbox === true ? 1 : 0)
			}, 0)}
		/>
	</Grid>
)
