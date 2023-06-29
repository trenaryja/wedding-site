import { Grid, Heading, StackProps, Text, useBreakpointValue, VStack } from '@chakra-ui/react'
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

export const UserGridCounts = ({ table }: UserGridFooterProps) => {
	const columnCount = useBreakpointValue({ base: 3, sm: 4, md: 5 })

	return (
		<Grid px={5} gridTemplateColumns={`repeat(${columnCount}, 1fr)`} rowGap={5} columnGap={10}>
			<Count label='Invites' value={table.getRowModel().rows.length} />
			<Count
				label='Plus Ones'
				value={
					table.getRowModel().rows.filter((x) => x.original.properties.Tags.multi_select.some((x) => x.name === '+1'))
						.length
				}
			/>
			<Count
				label='Total'
				value={table
					.getRowModel()
					.rows.reduce(
						(total, x) =>
							total + (x.original.properties.Tags.multi_select.some((x) => x.name === '+1') === true ? 1 : 0),
						table.getRowModel().rows.length,
					)}
			/>
			<Count
				label='Yes'
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
				label='No'
				value={table
					.getRowModel()
					.rows.reduce(
						(total, x) =>
							total +
							(x.original.properties.IsAttending.checkbox === false ? 1 : 0) +
							(x.original.properties.Tags.multi_select.some((x) => x.name === '+1') === true &&
							x.original.properties.IsPlusOneAttending.checkbox === false
								? 1
								: 0),
						0,
					)}
			/>
			{/* <Count
				label='Maybe'
				value={table
					.getRowModel()
					.rows.reduce(
						(total, x) =>
							total +
							(x.original.properties.IsAttending.checkbox === null ? 1 : 0) +
							(x.original.properties.Tags.multi_select.some((x) => x.name === '+1') &&
							x.original.properties.IsPlusOneAttending.checkbox === null
								? 1
								: 0),
						0,
					)}
			/> */}
		</Grid>
	)
}
