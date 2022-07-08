import { ChakraProvider, Container, Flex } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import BackToTop from '../components/BackToTop'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { fetchJson, theme } from '../utils'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Justin & Rachel</title>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
				<link rel='icon' type='image/svg+xml' href='favicon.svg' />
			</Head>
			<SWRConfig
				value={{
					fetcher: fetchJson,
				}}
			>
				<ChakraProvider resetCSS theme={theme}>
					<Flex minW='xs' overflowX='hidden' flexDir='column' minH='100vh'>
						<Header />
						<Container display='flex' flex={1} justifyContent='center' maxW='container.xl' as='main'>
							<Component {...pageProps} />
						</Container>
						<BackToTop />
						<Footer />
					</Flex>
				</ChakraProvider>
			</SWRConfig>
		</>
	)
}

export default MyApp
