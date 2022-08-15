import { AddIcon, DeleteIcon, DownloadIcon, EditIcon } from '@chakra-ui/icons'
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
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
	useToast,
	VStack,
} from '@chakra-ui/react'
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	RowSelectionState,
	SortingState,
	useReactTable,
} from '@tanstack/react-table'
import { useMemo, useRef, useState } from 'react'
import { CSVLink } from 'react-csv'
import { globalFilterFn, sortComponents } from '../utils/table'

type Person = {
	firstName: string
	lastName: string
	age: number
}

const columnHelper = createColumnHelper<Person>()

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
	const [currentRowId, setCurrentRowId] = useState('')
	const [showModal, setShowModal] = useState(false)
	const [showAlert, setShowAlert] = useState(false)
	const cancelAlertRef = useRef()
	const toast = useToast()

	const columns = useMemo(() => {
		return [
			columnHelper.accessor('firstName', {}),
			columnHelper.accessor('lastName', {}),
			columnHelper.accessor('age', {}),
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
						<IconButton size='xs' icon={<EditIcon />} aria-label='Edit' onClick={() => beginEditRow(row.id)} />
						<IconButton size='xs' icon={<DeleteIcon />} aria-label='Delete' onClick={() => beginDeleteRow(row.id)} />
					</HStack>
				),
			}),
		]
	}, [])
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

	const exportData = table.getRowModel().rows.map((x) => x.original as Person)
	const currentRowData = currentRowId ? (table.getRow(currentRowId).original as Person) : undefined

	const resetTable = () => {
		setGlobalFilter('')
		setSorting([])
		setRowSelection({})
		setCurrentRowId('')
	}

	const beginEditRow = (rowId: string) => {
		setCurrentRowId(rowId)
		setShowModal(true)
	}

	const beginDeleteRow = (rowId: string) => {
		setCurrentRowId(rowId)
		setShowAlert(true)
	}

	const confirmDeleteRow = () => {
		toast({ title: 'Row deleted', description: 'The row has been deleted', status: 'warning' })
		closeAlert()
	}

	const confirmEditRow = () => {
		if (currentRowId) {
			toast({ title: 'Row updated', description: 'The row has been updated', status: 'success' })
		} else {
			toast({ title: 'Row added', description: 'The row has been added', status: 'success' })
		}
		closeModal()
	}

	const closeModal = () => {
		setShowModal(false)
		setCurrentRowId('')
	}

	const closeAlert = () => {
		setShowAlert(false)
		setCurrentRowId('')
	}

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

			<Modal isOpen={showModal} onClose={closeModal} isCentered closeOnOverlayClick={false}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{currentRowData ? `Editing ${currentRowData?.firstName}` : 'Adding New User'}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>{currentRowData?.firstName}</Text>
					</ModalBody>
					<ModalFooter>
						<Button onClick={confirmEditRow}>Save</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<AlertDialog isCentered isOpen={showAlert} leastDestructiveRef={cancelAlertRef} onClose={closeAlert}>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader>{`Deleting ${currentRowData?.firstName}`}</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>Are you sure? You cant undo this action afterwards.</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelAlertRef} onClick={closeAlert}>
							Cancel
						</Button>
						<Button colorScheme='red' onClick={confirmDeleteRow} ml={3}>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</VStack>
	)
}
