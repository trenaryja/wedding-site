import { extendTheme, theme as defaultTheme, useTheme as defaultUseTheme } from '@chakra-ui/react'

type Theme = typeof defaultTheme

export const theme = extendTheme(defaultTheme, {
	config: {
		initialColorMode: 'dark',
	},
	styles: {
		global: {
			body: {
				bg: 'transparent',
				backgroundImage: 'url(https://www.toptal.com/designers/subtlepatterns/uploads/ep_naturalblack.png)',
			},
		},
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

export default theme
