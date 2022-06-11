import { Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'

type MenuItemProps = {
	children: ReactNode
	to: string
}

const MenuItem = ({ children, to }: MenuItemProps) => (
	<Link href={to}>
		<Text
			fontWeight={true ? 'bold' : 'hairline'}
			textDecoration={true ? 'underline' : 'initial'}
			textUnderlineOffset={10}
			p={2}
			cursor='pointer'
			casing='uppercase'
		>
			{children}
		</Text>
	</Link>
)

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
