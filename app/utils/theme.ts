import type { ThemeConfig } from '@chakra-ui/react'
import { extendTheme, theme as defaultTheme, useTheme as defaultUseTheme } from '@chakra-ui/react'

const config: ThemeConfig = {
	useSystemColorMode: true,
	initialColorMode: 'dark',
}

type Theme = typeof defaultTheme & {
	// insert any additional values
}

const theme = extendTheme(defaultTheme, { config }) as Theme

export const useTheme = () => {
	return defaultUseTheme() as Theme
}

export default theme
