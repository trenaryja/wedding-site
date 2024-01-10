import { BackToTop, BackgroundParticles, Footer, Header } from '@/components'
import { CONTENT_WIDTH, chakraTheme, fetcher } from '@/utils'
import { ChakraProvider, Grid, GridProps } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr'

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
			<SWRConfig value={{ fetcher }}>
				<ChakraProvider resetCSS theme={chakraTheme}>
					<BackgroundParticles />
					<PageWrapper>
						<Header />
						<Component {...pageProps} />
						<BackToTop />
						<Footer />
					</PageWrapper>
				</ChakraProvider>
			</SWRConfig>
		</>
	)
}

export default App
