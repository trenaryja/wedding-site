import { AddIcon, DeleteIcon, DownloadIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
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
	ModalHeader,
	ModalOverlay,
	Spinner,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	VStack,
	useToast,
} from '@chakra-ui/react'
import { User } from '@prisma/client'
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
import { formatDistance, parseISO } from 'date-fns'
import Router from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CSVLink } from 'react-csv'
import { UserForm, UserGridCounts } from '..'
import { useSession } from '../../hooks'
import { db, formatPhoneNumber, setSession } from '../../utils'
import { globalFilterFn, sortComponents } from '../../utils/table'

const columnHelper = createColumnHelper<User>()
const today = new Date()

export const UserGrid = () => {
	const [data, setData] = useState<User[]>([])
	const [sorting, setSorting] = useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = useState('')
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
	const [currentRowId, setCurrentRowId] = useState('')
	const [showModal, setShowModal] = useState(false)
	const [showAlert, setShowAlert] = useState(false)
	const cancelAlertRef = useRef()
	const toast = useToast()
	const { session, mutateSession } = useSession()

	const columns = useMemo(() => {
		return [
			columnHelper.accessor('firstName', {}),
			columnHelper.accessor('lastName', {}),
			columnHelper.accessor('phone', {
				cell: ({ getValue }) => <Text fontFamily='monospace'>{formatPhoneNumber(getValue())}</Text>,
			}),
			columnHelper.accessor('isAttending', {
				header: () => 'Attending',
				cell: ({ getValue }) => (
					<Checkbox
						isChecked={getValue() ?? false}
						isIndeterminate={getValue() === false}
						readOnly
						colorScheme={getValue() === false ? 'red' : undefined}
					/>
				),
			}),
			columnHelper.accessor('isPlusOneAllowed', {
				header: () => '+1 Allowed',
				cell: ({ getValue }) => <Checkbox isChecked={getValue() ?? false} />,
			}),
			columnHelper.accessor('plusOneName', {
				header: () => '+1 Name',
			}),
			columnHelper.accessor('lastLogin', {
				header: () => 'Last Login',
				cell: ({ getValue }) => {
					const date = getValue() as unknown as string
					if (!date) return <Text>Never</Text>
					return <Text>{formatDistance(parseISO(date), today)}</Text>
				},
			}),
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
						<IconButton size='xs' icon={<EditIcon />} aria-label='Edit' onClick={() => beginEditRow(row.id)} />
						<IconButton size='xs' icon={<DeleteIcon />} aria-label='Delete' onClick={() => beginDeleteRow(row.id)} />
						<IconButton size='xs' icon={<ViewIcon />} aria-label='Impersonate' onClick={() => impersonateRow(row.id)} />
					</HStack>
				),
			}),
		]
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const table: TableType<User> = useReactTable({
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

	const updateGrid = async () => setData(await db.getUsers())

	useEffect(() => {
		const asyncUseEffect = async () => await updateGrid()
		asyncUseEffect()
	}, [])

	const exportData = table?.getRowModel().rows.map((x) => x.original as User)
	const currentRowData = currentRowId ? (table.getRow(currentRowId).original as User) : undefined

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

	const impersonateRow = async (rowId: string) => {
		await mutateSession(await setSession({ ...session, user: table.getRow(rowId).original as User }))
		Router.push('/rsvp')
	}

	const confirmDeleteRow = async () => {
		const { id } = table.getRow(currentRowId).original as User
		await db.deleteUser(id)
		toast({ title: 'Row deleted', description: 'The row has been deleted', status: 'warning' })
		closeAlert()
		await updateGrid()
	}

	const confirmEditRow = async (rowData: User) => {
		if (currentRowId) {
			await db.updateUser(rowData.id, rowData)
			toast({ title: 'Row updated', description: 'The row has been updated', status: 'success' })
		} else {
			await db.createUser(rowData)
			toast({ title: 'Row added', description: 'The row has been added', status: 'success' })
		}
		closeModal()
		await updateGrid()
	}

	const closeModal = () => {
		setShowModal(false)
		setCurrentRowId('')
	}

	const closeAlert = () => {
		setShowAlert(false)
		setCurrentRowId('')
	}

	if (!data) return <Spinner />

	return (
		<VStack pt={5} alignItems='center' w='100%' borderWidth='thin' borderRadius='lg' bg='blackAlpha.500'>
			<VStack w='100%' px={5} alignItems='flex-start'>
				<HStack>
					<IconButton icon={<AddIcon />} aria-label='Add' onClick={() => setShowModal(true)} />
					<CSVLink data={exportData} filename='users.csv'>
						<IconButton icon={<DownloadIcon />} aria-label='Download' />
					</CSVLink>
					<Input placeholder='Search' value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
					<CloseButton onClick={resetTable} />
				</HStack>
			</VStack>

			<UserGridCounts table={table} />

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

			<Modal isOpen={showModal} onClose={closeModal} isCentered closeOnOverlayClick={false} size='xl'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{currentRowData ? `Editing ${currentRowData?.firstName}` : 'Adding New User'}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<UserForm data={currentRowData} onSubmit={confirmEditRow} />
					</ModalBody>
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
