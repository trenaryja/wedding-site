import { Box, Button, Container, Grid, Text } from '@chakra-ui/react'
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
				<Button variant={isActive ? 'solid' : 'outline'}>
					<Text casing='uppercase'>{children}</Text>
				</Button>
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
					<MenuItem to='registry'>registry</MenuItem>
					<MenuItem to='rsvp'>rsvp</MenuItem>
				</Grid>
			</Container>
		</Box>
	)
}
