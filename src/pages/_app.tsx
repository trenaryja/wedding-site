import { ChakraProvider, Container, Flex } from '@chakra-ui/react'

import { AppProps } from 'next/app'
import Head from 'next/head'
import BackToTop from '../components/BackToTop'
import Footer from '../components/Footer'
import Header from '../components/Header'
import theme from '../utils/theme'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Justin & Rachel</title>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
				<link rel='icon' type='image/svg+xml' href='favicon.svg' />
			</Head>
			<ChakraProvider resetCSS theme={theme}>
				<Flex minW='xs' overflowX='hidden' flexDir='column' minH='100vh'>
					<Header />
					<Container maxW='container.xl' as='main'>
						<Component {...pageProps} />
					</Container>
					<BackToTop />
					<Footer />
				</Flex>
			</ChakraProvider>
		</>
	)
}

export default MyApp
