import type { ThemeConfig } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const config: ThemeConfig = {
	useSystemColorMode: true,
	initialColorMode: 'dark',
}

const theme = extendTheme({ config })

export default theme
