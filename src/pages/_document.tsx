import { chakraTheme } from '@/utils'
import { Box, ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
	render() {
		return (
			<Html>
				<Head />
				<Box as='body' sx={{ a: { textDecoration: 'underline' } }}>
					<ColorModeScript initialColorMode={chakraTheme.config.initialColorMode} />
					<Main />
					<NextScript />
				</Box>
			</Html>
		)
	}
}
