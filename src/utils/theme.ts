import { theme as defaultTheme, useTheme as defaultUseTheme, extendTheme } from '@chakra-ui/react'
import { MantineThemeOverride } from '@mantine/core'
import { Limelight, Raleway } from 'next/font/google'

type Theme = typeof defaultTheme

export const raleWay = Raleway({ subsets: ['latin'] })
export const limelight = Limelight({ weight: '400', subsets: ['latin'] })

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
