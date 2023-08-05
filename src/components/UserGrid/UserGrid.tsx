import { ChevronDownIcon, ViewIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	Checkbox,
	CloseButton,
	Flex,
	Grid,
	HStack,
	IconButton,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spinner,
	Table,
	Tag,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import {
	RowSelectionState,
	SortingState,
	Table as TableType,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import Router from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import { useSession } from '../../hooks'
import { db, formatPhoneNumber, setSession } from '../../utils'
import { NotionUser } from '../../utils/notion'
import { globalFilterFn, sortComponents } from '../../utils/table'
import { UserGridCounts } from './UserGridCounts'

const columnHelper = createColumnHelper<NotionUser>()

export const UserGrid = () => {
	const [data, setData] = useState<NotionUser[]>([])
	const [sorting, setSorting] = useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = useState('')
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
	const { session, mutateSession } = useSession()

	const columns = useMemo(() => {
		return [
			columnHelper.display({
				id: 'actions',
				header: ({ table }) => (
					<Checkbox
						isIndeterminate={table.getIsSomeRowsSelected()}
						isChecked={table.getIsAllRowsSelected() ?? false}
						onChange={table.getToggleAllRowsSelectedHandler()}
					/>
				),
				cell: ({ row }) => (
					<HStack>
						<Checkbox isChecked={row.getIsSelected() ?? false} onChange={row.getToggleSelectedHandler()} />
						<IconButton size='xs' icon={<ViewIcon />} aria-label='Impersonate' onClick={() => impersonateRow(row.id)} />
					</HStack>
				),
			}),
			columnHelper.accessor((row) => row.properties.Name.title[0].plain_text, { id: 'name' }),
			columnHelper.accessor((row) => row.properties.PlusOneName.rich_text[0]?.plain_text, { id: 'Plus One Name' }),
			columnHelper.accessor((row) => formatPhoneNumber(row.properties.Phone.phone_number), {
				id: 'phone',
				cell: ({ getValue }) => <pre>{getValue()}</pre>,
			}),
			columnHelper.accessor((row) => row.properties.Tags.multi_select.sort((a, z) => a.name.localeCompare(z.name)), {
				id: 'tags',
				cell: ({ getValue }) => (
					<Flex gap={2}>
						{getValue().map((x) => (
							<Tag color={x.color} key={x.id}>
								{x.name}
							</Tag>
						))}
					</Flex>
				),
			}),
		]
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const table: TableType<NotionUser> = useReactTable({
		columns,
		data,
		globalFilterFn,
		state: { sorting, globalFilter, rowSelection },
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onGlobalFilterChange: setGlobalFilter,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
	})

	const updateGrid = async () => setData(await db.getNotionUsers())

	useEffect(() => {
		const asyncUseEffect = async () => {
			await updateGrid()
		}
		asyncUseEffect()
	}, [])

	const resetTable = () => {
		setGlobalFilter('')
		setSorting([])
		setRowSelection({})
	}

	const impersonateRow = async (rowId: string) => {
		await mutateSession(await setSession({ ...session, user: table.getRow(rowId).original }))
		Router.push('/rsvp')
	}

	if (!data) return <Spinner placeSelf='center' />

	// TODO:
	// Filter Buttons: Confirmed Yes, Never Logged In, Rehearsals, etc.
	// Button to send out text to all selected users
	// Button to send invite text for an individual
	// Create prompts for RSVP, Reminders, Day of, Thank you

	return (
		<Grid className='full-bleed' gap={5}>
			<UserGridCounts table={table} />

			<HStack justifySelf='center'>
				<Menu>
					<MenuButton as={Button} leftIcon={<FaFilter />} rightIcon={<ChevronDownIcon />} />
					<MenuList>
						<MenuItem>Confirmed Yes</MenuItem>
						<MenuItem>Never Logged In</MenuItem>
						<MenuItem>Rehearsals</MenuItem>
						<MenuItem>Bachelor</MenuItem>
					</MenuList>
				</Menu>
				<Input placeholder='Search' value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
				<CloseButton onClick={resetTable} />
			</HStack>

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
											{sortComponents[header.column.getIsSorted() as string]}
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
