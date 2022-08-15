import { AddIcon, DownloadIcon, EditIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	Checkbox,
	CloseButton,
	HStack,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	VStack,
} from '@chakra-ui/react'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
	ColumnDef,
	createColumnHelper,
	FilterFn,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	RowSelectionState,
	SortingState,
	useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { CSVLink } from 'react-csv'

type Person = {
	firstName: string
	lastName: string
	age: number
}
const globalFilterFn: FilterFn<any> = (row, columnId, value, addMeta) => {
	const itemRank = rankItem(row.getValue(columnId), value)
	addMeta({ itemRank })
	return itemRank.passed
}
const columnHelper = createColumnHelper<Person>()
const columns: ColumnDef<Person>[] = [
	columnHelper.display({
		id: 'actions',
		header: ({ table }) => (
			<Checkbox
				isIndeterminate={table.getIsSomeRowsSelected()}
				isChecked={table.getIsAllRowsSelected()}
				onChange={table.getToggleAllRowsSelectedHandler()}
			/>
		),
		cell: ({ row }) => (
			<HStack>
				<Checkbox isChecked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
				<IconButton size='xs' icon={<EditIcon />} aria-label='Edit' />
			</HStack>
		),
	}),
	columnHelper.accessor('firstName', {}),
	columnHelper.accessor('lastName', {}),
	columnHelper.accessor('age', {}),
]
const sortComponents = { asc: <TriangleUpIcon />, desc: <TriangleDownIcon /> }

const defaultData: Person[] = [
	{
		firstName: 'tanner',
		lastName: 'linsley',
		age: 24,
	},
	{
		firstName: 'tandy',
		lastName: 'miller',
		age: 40,
	},
	{
		firstName: 'joe',
		lastName: 'dirte',
		age: 45,
	},
]

export default function UserGrid() {
	const [sorting, setSorting] = useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = useState('')
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

	const [showModal, setShowModal] = useState(false)
	const table = useReactTable({
		columns,
		data: defaultData,
		globalFilterFn,
		state: { sorting, globalFilter, rowSelection },
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onGlobalFilterChange: setGlobalFilter,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
	})

	const resetTable = () => {
		setGlobalFilter('')
		setSorting([])
		setRowSelection({})
	}

	const exportData = table.getRowModel().rows.map((x) => x.original)

	return (
		<VStack py={5} alignItems='center' w='100%' borderWidth='medium' borderRadius='lg'>
			<VStack w='100%' px={5} alignItems='flex-start'>
				<HStack>
					<IconButton icon={<AddIcon />} aria-label='Add' onClick={() => setShowModal(true)} />
					<CSVLink data={exportData} filename='users.csv'>
						<IconButton icon={<DownloadIcon />} aria-label='Download' />
					</CSVLink>
					<Input placeholder='Search' value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
					<CloseButton onClick={resetTable} />
				</HStack>
				{/* Filter Chips/Buttons */}
				{/* <HStack w='100%' overflow='auto'>
					{[...Array(50).keys()].map((x) => (
						<Button flexShrink={0} variant='outline' borderRadius='full' key={x}>
							{`Hello World ${x + 1}`}
						</Button>
					))}
				</HStack> */}
			</VStack>
			<Box overflow='auto' w='100%'>
				<Table>
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
			<Text>{table.getRowModel().rows.length} rows</Text>

			<Modal isOpen={showModal} onClose={() => setShowModal(false)} isCentered closeOnOverlayClick={false}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>Hello world!</Text>
					</ModalBody>
					<ModalFooter>
						<Button>Save</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</VStack>
	)
}
