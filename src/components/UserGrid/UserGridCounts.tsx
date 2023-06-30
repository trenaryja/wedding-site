import { Flex, Heading, StackProps, Text, VStack } from '@chakra-ui/react'
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
	return (
		<Flex px={5} columnGap={20} rowGap={5} wrap='wrap' justifyContent='space-around'>
			<Count label='Invites' value={table.getRowModel().rows.length} />
			<Count
				label='Plus Ones'
				value={
					table.getRowModel().rows.filter((x) => x.original.properties.Tags.multi_select.some((x) => x.name === '+1'))
						.length
				}
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
		</Flex>
	)
}
