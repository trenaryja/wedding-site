import { Box, BoxProps, Grid, Heading, Image, useBreakpointValue } from '@chakra-ui/react'

const flatHexApectRatio = 2 / Math.sqrt(3)
const flatHexClipPath = `polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);`
const Hexagon = (props: BoxProps) => <Box clipPath={flatHexClipPath} {...props}></Box>

type PersonProps = {
	first: string
	last: string
	title: string
}

const Person = ({ first, last, title }: PersonProps) => (
	<Box>
		<Grid>
			<Hexagon gridArea='x' bg='whiteAlpha.300' />
			<Hexagon gridArea='x' bg='whiteAlpha.400' transform='scale(.9)' />
			<Hexagon gridArea='x' bg='whiteAlpha.500' transform='scale(.8)' />
			<Hexagon gridArea='x' bg='whiteAlpha.600' transform='scale(.7)' />
			<Hexagon gridArea='x' bg='whiteAlpha.700' transform='scale(.6)' />
			<Hexagon gridArea='x' bg='whiteAlpha.800' transform='scale(.5)' />
			<Image
				gridArea='x'
				zIndex={1}
				alt={first}
				objectFit='cover'
				clipPath='polygon(0% 0%, 100% 0%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);'
				filter='grayscale(.75) contrast(1.25)'
				sx={{ aspectRatio: `${flatHexApectRatio}` }}
				src={`/people/${first}.png`}
			/>
		</Grid>
		<Heading textAlign='center'>
			{first} {last}
		</Heading>
		<Heading textAlign='center' size='md'>
			{title}
		</Heading>
	</Box>
)

const people: PersonProps[] = [
	{ first: 'Rachel', last: 'Hamilton', title: 'Bride' },
	{ first: 'Justin', last: 'Trenary', title: 'Groom' },
	{ first: 'Janice', last: 'Turton', title: 'Officiant ' },
	{ first: 'Emily', last: 'Western', title: 'Maid of Honor' },
	{ first: 'Amanda', last: 'Glines', title: 'Bridesmaid' },
	{ first: 'Chase', last: 'Canterberry', title: 'Bridesman' },
	{ first: 'Ross', last: 'Combs', title: 'Best Man' },
	{ first: 'Josh', last: 'Trenary', title: 'Groomsman' },
	{ first: 'Jay', last: 'Seghi', title: 'Groomsman' },
]

export default function Index() {
	const columnCount = useBreakpointValue({ base: 1, sm: 2, md: 3 })
	return (
		<Grid gap={10} pt={10} gridTemplateColumns={`repeat(${columnCount}, 1fr)`}>
			{people.map((person) => (
				<Person key={person.first} {...person} />
			))}
		</Grid>
	)
}
