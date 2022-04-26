import { Box, Container, Grid, Text } from '@chakra-ui/react'
import { NavLink } from '@remix-run/react'
import type { ReactNode } from 'react'

type MenuItemProps = {
	children: ReactNode
	to: string
}

const MenuItem = ({ children, to }: MenuItemProps) => (
	<NavLink to={to}>
		{({ isActive }) => {
			return (
				<Text
					fontWeight={isActive ? 'bold' : 'hairline'}
					textDecoration={isActive ? 'underline' : 'initial'}
					textUnderlineOffset={10}
					p={2}
					cursor='pointer'
					casing='uppercase'
				>
					{children}
				</Text>
			)
		}}
	</NavLink>
)

export default function Header() {
	return (
		<Box as='header'>
			<Container maxW='container.xl'>
				<Grid autoFlow='column' justifyContent='space-around'>
					<MenuItem to=''>home</MenuItem>
					<MenuItem to='info'>info</MenuItem>
					<MenuItem to='people'>people</MenuItem>
					<MenuItem to='rsvp'>rsvp</MenuItem>
				</Grid>
			</Container>
		</Box>
	)
}
