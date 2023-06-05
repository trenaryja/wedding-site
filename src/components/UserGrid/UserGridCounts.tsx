import { Grid, Heading, StackProps, Text, useBreakpointValue, VStack } from '@chakra-ui/react'
import { User } from '@prisma/client'
import { Table } from '@tanstack/react-table'

export type UserGridFooterProps = {
	table: Table<User>
}

const Count = ({ label, value, ...rest }: { label: string; value: number } & StackProps) => (
	<VStack {...rest}>
		<Text whiteSpace='nowrap'>{label}</Text>
		<Heading>{value}</Heading>
	</VStack>
)

export const UserGridCounts = ({ table }: UserGridFooterProps) => {
	const columnCount = useBreakpointValue({ base: 3, sm: 4, md: 6 })

	return (
		<Grid px={5} gridTemplateColumns={`repeat(${columnCount}, 1fr)`} rowGap={5} columnGap={10}>
			<Count label='Invites' value={table.getRowModel().rows.length} />
			<Count label='Plus Ones' value={table.getRowModel().rows.filter((x) => x.original.isPlusOneAllowed).length} />
			<Count
				label='Total'
				value={table.getRowModel().rows.reduce((total, x) => total + 1 + +x.original.isPlusOneAllowed, 0)}
			/>
			<Count
				label='Yes'
				value={table
					.getRowModel()
					.rows.reduce(
						(total, x) =>
							total + (x.original.isAttending === true ? 1 : 0) + (x.original.isPlusOneAttending === true ? 1 : 0),
						0,
					)}
			/>
			<Count
				label='No'
				value={table
					.getRowModel()
					.rows.reduce(
						(total, x) =>
							total + (x.original.isAttending === false ? 1 : 0) + (x.original.isPlusOneAttending === false ? 1 : 0),
						0,
					)}
			/>
			<Count
				label='Maybe'
				value={table
					.getRowModel()
					.rows.reduce(
						(total, x) =>
							total +
							(x.original.isAttending === null ? 1 : 0) +
							(x.original.isPlusOneAllowed && x.original.isPlusOneAttending === null ? 1 : 0),
						0,
					)}
			/>
		</Grid>
	)
}
