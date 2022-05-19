import { ChakraProvider, Container, Flex } from '@chakra-ui/react'
import { withEmotionCache } from '@emotion/react'
import type { LinksFunction, MetaFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import React, { useContext, useEffect } from 'react'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import Header from './components/Header'
import { ClientStyleContext, ServerStyleContext } from './context'
import theme from './utils/theme'

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Rachel & Justin',
	viewport: 'width=device-width,initial-scale=1',
})

export let links: LinksFunction = () => {
	return [
		{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
		{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
		},
		{
			rel: 'icon',
			type: 'image/svg+xml',
			href: '/images/favicon.svg',
		},
	]
}

interface DocumentProps {
	children: React.ReactNode
}

const Document = withEmotionCache(({ children }: DocumentProps, emotionCache) => {
	const serverStyleData = useContext(ServerStyleContext)
	const clientStyleData = useContext(ClientStyleContext)

	useEffect(() => {
		emotionCache.sheet.container = document.head
		const tags = emotionCache.sheet.tags
		emotionCache.sheet.flush()
		tags.forEach((tag) => {
			;(emotionCache.sheet as any)._insertTag(tag)
		})
		clientStyleData?.reset()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<html lang='en'>
			<head>
				<Meta />
				<Links />
				{serverStyleData?.map(({ key, ids, css }) => (
					<style key={key} data-emotion={`${key} ${ids.join(' ')}`} dangerouslySetInnerHTML={{ __html: css }} />
				))}
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
})

export default function App() {
	return (
		<Document>
			<ChakraProvider theme={theme}>
				<Flex minW='xs' overflowX='hidden' flexDir='column' minH='100vh'>
					<Header />
					<Container maxW='container.sm' as='main'>
						<Outlet />
					</Container>
					<BackToTop />
					<Footer />
				</Flex>
			</ChakraProvider>
		</Document>
	)
}
