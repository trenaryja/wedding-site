import { useSession } from '@/hooks'
import type { NotionUser } from '@/utils'
import { formatPhoneNumber, getNotionUsers, setSessionUser } from '@/utils'
import { Box, Grid, HStack, IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import type { ReactTable } from '@tanstack/react-table'
import {
	createColumnHelper,
	createSortedRowModel,
	rowSortingFeature,
	tableFeatures,
	useTable,
} from '@tanstack/react-table'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { FaSortDown, FaSortUp, FaUserSecret } from 'react-icons/fa'
import { UserGridCounts } from './UserGridCounts'

const features = tableFeatures({ rowSortingFeature, sortedRowModel: createSortedRowModel() })
export type UserTable = ReactTable<typeof features, NotionUser>

const columnHelper = createColumnHelper<typeof features, NotionUser>()

export const UserGrid = () => {
	const [data, setData] = useState<NotionUser[]>([])
	const { mutateSession } = useSession()

	const impersonateUser = async (user: NotionUser) => {
		await mutateSession(await setSessionUser(user))
		await Router.push('/rsvp')
	}

	const table = useTable({
		features,
		data,
		columns: columnHelper.columns([
			columnHelper.accessor((row) => row.properties.Name.title[0]?.plain_text, {
				id: 'name',
				cell: ({ getValue, row }) => (
					<HStack>
						<IconButton
							size='xs'
							icon={<FaUserSecret />}
							aria-label='Impersonate'
							onClick={() => void impersonateUser(row.original)}
						/>
						<b>{getValue()}</b>,
					</HStack>
				),
			}),
			columnHelper.accessor((row) => row.properties.PlusOneName.rich_text[0]?.plain_text, { id: 'plusOneName' }),
			columnHelper.accessor((row) => formatPhoneNumber(row.properties.Phone.phone_number ?? undefined), {
				id: 'phone',
				cell: ({ getValue }) => <pre>{getValue()}</pre>,
			}),
		]),
	})

	useEffect(() => {
		const asyncUseEffect = async () => setData(await getNotionUsers())
		void asyncUseEffect()
	}, [])

	return (
		<Grid className='full-bleed' gap={5}>
			<UserGridCounts table={table} />

			<Box overflow='auto'>
				<Table overflow='auto'>
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const direction = header.column.getIsSorted()
									return (
										<Th key={header.id} cursor='pointer' whiteSpace='nowrap'>
											<HStack
												gap={2}
												onClick={header.column.getToggleSortingHandler()}
												pr={direction ? undefined : 5}
												userSelect='none'
											>
												<table.FlexRender header={header} />
												{direction && { asc: <FaSortUp />, desc: <FaSortDown /> }[direction]}
											</HStack>
										</Th>
									)
								})}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.map((row) => (
							<Tr key={row.id}>
								{row.getAllCells().map((cell) => (
									<Td key={cell.id} whiteSpace='nowrap'>
										<table.FlexRender cell={cell} />
									</Td>
								))}
							</Tr>
						))}
					</Tbody>
				</Table>
			</Box>
		</Grid>
	)
}
