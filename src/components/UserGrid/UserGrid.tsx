import { useSession } from '@/hooks'
import { NotionUser, formatPhoneNumber, getNotionUsers, setSession } from '@/utils'
import { Box, Grid, HStack, IconButton, Spinner, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import {
	SortingState,
	Table as TableType,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import Router from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { FaSortDown, FaSortUp, FaUserSecret } from 'react-icons/fa'
import { UserGridCounts } from '.'

const columnHelper = createColumnHelper<NotionUser>()

export const UserGrid = () => {
	const [data, setData] = useState<NotionUser[]>([])
	const [sorting, setSorting] = useState<SortingState>([])
	const { session, mutateSession } = useSession()

	const columns = useMemo(() => {
		const impersonateUser = async (user: NotionUser) => {
			await mutateSession(await setSession({ ...session, user }))
			Router.push('/rsvp')
		}

		return [
			columnHelper.accessor((row) => row.properties.Name.title[0].plain_text, {
				id: 'name',
				cell: ({ getValue, row }) => (
					<HStack>
						<IconButton
							size='xs'
							icon={<FaUserSecret />}
							aria-label='Impersonate'
							onClick={() => impersonateUser(row.original)}
						/>
						<b>{getValue()}</b>,
					</HStack>
				),
			}),
			columnHelper.accessor((row) => row.properties.PlusOneName.rich_text[0]?.plain_text, { id: 'plusOneName' }),
			columnHelper.accessor((row) => formatPhoneNumber(row.properties.Phone.phone_number), {
				id: 'phone',
				cell: ({ getValue }) => <pre>{getValue()}</pre>,
			}),
		]
	}, [mutateSession, session])

	const table: TableType<NotionUser> = useReactTable({
		columns,
		data,
		state: { sorting },
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
	})

	useEffect(() => {
		const asyncUseEffect = async () => setData(await getNotionUsers())
		asyncUseEffect()
	}, [])

	if (!data) return <Spinner placeSelf='center' />

	return (
		<Grid className='full-bleed' gap={5}>
			<UserGridCounts table={table} />

			<Box overflow='auto'>
				<Table overflow='auto'>
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<Th key={header.id} cursor='pointer' whiteSpace='nowrap'>
										<HStack
											gap={2}
											onClick={header.column.getToggleSortingHandler()}
											pr={header.column.getIsSorted() ? undefined : 5}
											userSelect='none'
										>
											{flexRender(header.column.columnDef.header, header.getContext())}
											{{ asc: <FaSortUp />, desc: <FaSortDown /> }[header.column.getIsSorted() as string]}
										</HStack>
									</Th>
								))}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.map((row) => (
							<Tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<Td key={cell.id} whiteSpace='nowrap'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
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
