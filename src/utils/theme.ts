import { extendTheme, theme as defaultTheme, useTheme as defaultUseTheme } from '@chakra-ui/react'

type Theme = typeof defaultTheme

export const theme = extendTheme(defaultTheme, {
	config: {
		initialColorMode: 'dark',
	},
	styles: {
		global: {
			body: {
				bg: 'black',
			},
		},
	},
	fonts: {
		...defaultTheme.fonts,
	},
} as Partial<Theme>) as Theme

export const useTheme = () => {
	return defaultUseTheme() as Theme
}

export default theme
