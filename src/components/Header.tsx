import { Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

type MenuItemProps = {
	children: ReactNode
	to: string
}

const MenuItem = ({ children, to }: MenuItemProps) => {
	const { pathname } = useRouter()
	return (
		<Link href={to}>
			<Heading size='md' textDecoration={to === pathname && 'underline'} p={2} cursor='pointer'>
				{children}
			</Heading>
		</Link>
	)
}

export const Header = () => {
	return (
		<Flex as='header' justifyContent='space-around' className='full-bleed' bg='blackAlpha.500' p={5} mb={10}>
			<MenuItem to='/'>home</MenuItem>
			<MenuItem to='/info'>info</MenuItem>
			<MenuItem to='/people'>people</MenuItem>
			<MenuItem to='/rsvp'>rsvp</MenuItem>
		</Flex>
	)
}
