import { ChakraProvider, Grid, GridProps, useTheme } from '@chakra-ui/react'
import { MantineProvider } from '@mantine/core'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import { BackToTop, BackgroundParticles, Footer, Header } from '../components'
import { CONTENT_WIDTH, chakraTheme, fetcher, mantineTheme } from '../utils'

const PageWrapper = (props: GridProps) => {
	const theme = useTheme()
	return (
		<Grid
			minH='100vh'
			position='relative'
			templateRows='auto 1fr auto'
			sx={{
				'> *': { gridColumn: 2 },
				'> .full-bleed': { gridColumn: '1/-1', width: '100%' },
				a: { textDecoration: 'underline' },
				ul: {
					paddingLeft: theme.space[5],
				},
			}}
			templateColumns={`1fr ${CONTENT_WIDTH} 1fr`}
			rowGap={5}
			{...props}
		/>
	)
}

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Rachel & Justin</title>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
				<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
			</Head>
			<SWRConfig value={{ fetcher }}>
				<MantineProvider theme={mantineTheme} withGlobalStyles withNormalizeCSS>
					<ChakraProvider resetCSS theme={chakraTheme}>
						<BackgroundParticles />
						<PageWrapper>
							<Header />
							<Component {...pageProps} />
							<BackToTop />
							<Footer />
						</PageWrapper>
					</ChakraProvider>
				</MantineProvider>
			</SWRConfig>
		</>
	)
}

export default MyApp
