import { BackgroundParticles, BackToTop, Footer, Header } from '@/components'
import { chakraTheme, CONTENT_WIDTH } from '@/utils'
import type { GridProps } from '@chakra-ui/react'
import { ChakraProvider, Grid } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

const PageWrapper = (props: GridProps) => {
	return (
		<Grid
			minH='100dvh'
			position='relative'
			templateRows='auto 1fr auto'
			sx={{
				'> *': { gridColumn: 2 },
				'> .full-bleed': { gridColumn: '1/-1', width: '100%' },
				a: { textDecoration: 'underline' },
				ul: {
					paddingLeft: 5,
				},
			}}
			templateColumns={`1fr ${CONTENT_WIDTH} 1fr`}
			rowGap={5}
			{...props}
		/>
	)
}

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>Rachel & Justin</title>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
				<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
			</Head>
			<ChakraProvider resetCSS theme={chakraTheme}>
				<BackgroundParticles />
				<PageWrapper>
					<Header />
					<Component {...pageProps} />
					<BackToTop />
					<Footer />
				</PageWrapper>
			</ChakraProvider>
		</>
	)
}

export default App
