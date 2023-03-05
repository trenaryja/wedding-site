import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import { chakraTheme } from '../utils'

export default class Document extends NextDocument {
	render() {
		return (
			<Html>
				<Head />
				<body>
					<ColorModeScript initialColorMode={chakraTheme.config.initialColorMode} />
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
