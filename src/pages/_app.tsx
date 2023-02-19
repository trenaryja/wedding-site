import { ChakraProvider, Container, Flex } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Particles from 'react-tsparticles'
import { SWRConfig } from 'swr'
import { BackToTop, Footer, Header } from '../components'
import { fetcher, theme } from '../utils'

import '@fontsource/limelight'
import '@fontsource/raleway'
import { MantineProvider } from '@mantine/core'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Rachel & Justin</title>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
				<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
			</Head>
			<SWRConfig value={{ fetcher }}>
				<MantineProvider
					theme={{
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
					}}
					withGlobalStyles
					withNormalizeCSS
				>
					<ChakraProvider resetCSS theme={theme}>
						<Particles
							options={{
								fullScreen: true,
								fps_limit: 60,
								particles: {
									move: { enable: true, random: true, speed: 0.25 },
									size: { value: { min: 1, max: 3 } },
									opacity: {
										animation: { enable: true, speed: 1, sync: false },
										value: { min: 0, max: 1 },
									},
								},
							}}
						/>
						<Flex minW='xs' overflowX='hidden' flexDir='column' minH='100vh'>
							<Header />
							<Container
								display='flex'
								flexDirection='column'
								flex={1}
								py='1rem'
								justifyContent='center'
								alignItems='center'
								maxW='container.xl'
								as='main'
							>
								<Component {...pageProps} />
							</Container>
							<BackToTop />
							<Footer />
						</Flex>
					</ChakraProvider>
				</MantineProvider>
			</SWRConfig>
		</>
	)
}

export default MyApp
