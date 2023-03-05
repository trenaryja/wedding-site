import { extendTheme, theme as defaultTheme, useTheme as defaultUseTheme } from '@chakra-ui/react'
import { MantineThemeOverride } from '@mantine/core'

type Theme = typeof defaultTheme

export const chakraTheme = extendTheme({
	config: {
		initialColorMode: 'dark',
	},
	fonts: {
		...defaultTheme.fonts,
		heading: `'Limelight', sans-serif`,
		body: `'Raleway', sans-serif`,
	},
} as Partial<Theme>) as Theme

export const useTheme = () => {
	return defaultUseTheme() as Theme
}

export const mantineTheme: MantineThemeOverride = {
	colorScheme: 'dark',
	colors: {
		dark: [
			'#ffffff',
			'#e3e3e3',
			'#c6c6c6',
			'#aaaaaa',
			'#8e8e8e',
			'#717171',
			'#555555',
			'#393939',
			'#1c1c1c',
			'#000000',
		],
	},
}
