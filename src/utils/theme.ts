import { theme as defaultTheme, useTheme as defaultUseTheme, extendTheme } from '@chakra-ui/react'
import { MantineThemeOverride } from '@mantine/core'
import { Limelight, Raleway } from 'next/font/google'

type Theme = typeof defaultTheme

export const raleWay = Raleway({ subsets: ['latin'] })
export const limelight = Limelight({ weight: '400', subsets: ['latin'] })

export const whiteAnchored = {
	50: '#fff',
	100: '#fafafa',
	200: '#f5f5f5',
	300: '#f0f0f0',
	400: '#dedede',
	500: '#c2c2c2',
	600: '#979797',
	700: '#818181',
	800: '#606060',
	900: '#3c3c3c',
} as const

export const blackAnchored = {
	50: '#f5f5f5',
	100: '#e9e9e9',
	200: '#d9d9d9',
	300: '#c4c4c4',
	400: '#9d9d9d',
	500: '#7b7b7b',
	600: '#555555',
	700: '#434343',
	800: '#262626',
	900: '#000',
} as const

export const chakraTheme = extendTheme({
	config: {
		initialColorMode: 'dark',
	},
	styles: {
		global: {
			body: { bg: 'transparent' },
		},
	},
	fonts: {
		...defaultTheme.fonts,
		heading: limelight.style.fontFamily,
		body: raleWay.style.fontFamily,
	},
	colors: {
		...defaultTheme.colors,
		gray: blackAnchored,
	},
} as Partial<Theme>) as Theme

export const useTheme = () => {
	return defaultUseTheme() as Theme
}

export const mantineTheme: MantineThemeOverride = {
	colorScheme: 'dark',
	colors: {
		dark: Object.values(blackAnchored) as [
			string,
			string,
			string,
			string,
			string,
			string,
			string,
			string,
			string,
			string,
		],
	},
}
