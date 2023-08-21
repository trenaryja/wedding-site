import { Grid, Spinner } from '@chakra-ui/react'
import { createPortal } from 'react-dom'

type FullScreenLoaderProps = {
	visible: boolean
}

export const FullScreenLoader = ({ visible }: FullScreenLoaderProps) => {
	if (!visible) return null
	return createPortal(
		<Grid position='fixed' inset={0} width='100vw' height='100vh' bg='blackAlpha.500'>
			<Spinner placeSelf='center' />
		</Grid>,
		document.body,
	)
}
