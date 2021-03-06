import { Flex, Text } from '@chakra-ui/react'
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
			<Text
				fontWeight={to === pathname ? 'black' : 'normal'}
				textDecoration={to === pathname ? 'underline' : 'initial'}
				textUnderlineOffset={10}
				p={2}
				cursor='pointer'
				casing='uppercase'
			>
				{children}
			</Text>
		</Link>
	)
}

export default function Header() {
	return (
		<Flex as='header' justifyContent='space-around'>
			<MenuItem to='/'>home</MenuItem>
			<MenuItem to='/info'>info</MenuItem>
			<MenuItem to='/people'>people</MenuItem>
			<MenuItem to='/rsvp'>rsvp</MenuItem>
		</Flex>
	)
}
