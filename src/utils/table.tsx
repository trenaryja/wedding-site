import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { rankItem } from '@tanstack/match-sorter-utils'
import { FilterFn } from '@tanstack/react-table'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalFilterFn: FilterFn<any> = (row, columnId, value, addMeta) => {
	const itemRank = rankItem(row.getValue(columnId), value)
	addMeta({ itemRank })
	return itemRank.passed
}

export const sortComponents = { asc: <TriangleUpIcon />, desc: <TriangleDownIcon /> }
