import { Box } from '@chakra-ui/react'
import ReactMarkdown, { Options } from 'react-markdown'
import useSWR from 'swr'

export const useMarkDown = (path: string, options?: Options) => {
	const { data, error, isLoading } = useSWR(`/api/markdown${path ? `?path=${path}` : ''}`)

	return {
		data: (
			<Box sx={{ '*': { all: 'revert' } }}>
				<ReactMarkdown {...options}>{data}</ReactMarkdown>{' '}
			</Box>
		),
		error,
		isLoading,
	}
}
