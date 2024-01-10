import { Flex, Heading, HeadingProps } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type MenuItemProps = {
	to: string
} & HeadingProps

const MenuItem = ({ children, to, ...props }: MenuItemProps) => {
	const { pathname } = useRouter()

	return (
		<Link href={to} style={{ textDecoration: 'none' }}>
			<Heading size='md' textDecoration={pathname.startsWith(to) ? 'underline' : ''} p={2} {...props}>
				{children}
			</Heading>
		</Link>
	)
}

export const Header = () => {
	return (
		<Flex as='header' justifyContent='space-around' className='full-bleed' bg='blackAlpha.500' p={5} mb={10}>
			<MenuItem to='/' textDecoration='none' color='transparent' textShadow={`0 0 0 #FFF`}>
				❤️
			</MenuItem>
			<MenuItem to='/info'>info</MenuItem>
			<MenuItem to='/people'>people</MenuItem>
			<MenuItem to='/rsvp'>rsvp</MenuItem>
			<MenuItem to='/photos'>photos</MenuItem>
		</Flex>
	)
}
