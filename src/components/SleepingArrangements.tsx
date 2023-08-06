import { Box, Grid, GridProps, Heading, Text, useBreakpointValue } from '@chakra-ui/react'

export type BedSize = 'King' | 'Queen' | 'Full'

export const BedAspectRatio: Record<BedSize, { aspectRatio: number; scale: number }> = {
	King: {
		aspectRatio: 80 / 76,
		scale: 1,
	},
	Queen: {
		aspectRatio: 80 / 60,
		scale: 1,
	},
	Full: {
		aspectRatio: 74 / 54,
		scale: 74 / 80,
	},
} as const

export const getBedFromSize = (size: string | BedSize) =>
	Object.entries(BedAspectRatio).find((x) => size.includes(x[0]))?.[1]

export type BedProps = {
	size: string | BedSize
	people: string[]
}

export type RoomProps = GridProps & {
	name: string
	bedGridProps?: GridProps
}

export const Bed = ({ size, people }: BedProps) => {
	const bed = getBedFromSize(size)
	return (
		<Grid
			textAlign='center'
			aspectRatio={`${bed.aspectRatio}`}
			width={`${bed.scale * 100}%`}
			borderWidth='thin'
			p={3}
			mx='auto'
			sx={{ writingMode: 'vertical-rl' }}
		>
			<Grid gap={5} autoFlow='column'>
				<Box bg='whiteAlpha.100' p={5} aspectRatio={`${9 / 16}`} />
				<Box bg='whiteAlpha.100' p={5} aspectRatio={`${9 / 16}`} />
			</Grid>
			<Heading size='xs'>{size}</Heading>
			<Grid>
				{people.map((person) => (
					<Text key={person}>{person}</Text>
				))}
			</Grid>
		</Grid>
	)
}
export const Room = ({ name, children, bedGridProps: childrenProps, ...props }: RoomProps) => (
	<Grid width='100%' gap={5} {...props}>
		<Heading size='md' textAlign='center'>
			{name}
		</Heading>
		<Grid gap={5} width='100%' {...childrenProps}>
			{children}
		</Grid>
	</Grid>
)

export const SleepingArrangements = () => {
	const columns = useBreakpointValue({ base: 1, sm: 2 })

	return (
		<Grid templateColumns={`repeat(${columns}, 1fr)`} p={5} gap={5}>
			<Room name='Bedroom 1'>
				<Bed size='King' people={['Bryant', 'Dan']} />
			</Room>
			<Room name='Bedroom 2'>
				<Bed size='King' people={['Mike', 'Scott']} />
			</Room>
			<Room
				name='Bedroom 3'
				column={`1 / ${columns + 1}`}
				bedGridProps={{ templateColumns: `repeat(${columns}, 1fr)` }}
			>
				<Bed size='Queen' people={['JD', 'Josh']} />
				<Bed size='Queen' people={['Ross', 'Andru']} />
			</Room>
			<Room
				name='Living Room'
				column={`1 / ${columns + 1}`}
				bedGridProps={{ templateColumns: `repeat(${columns}, 1fr)` }}
			>
				<Bed size='Queen Pull Out' people={['Casey W', 'Jay']} />
				<Bed size='Queen Air Mattress' people={['Casey C']} />
				<Bed size='Queen Air Mattress' people={['Chris']} />
				<Bed size='Queen Air Mattress' people={['Nate']} />
				<Bed size='Full Pull Out' people={['Justin']} />
			</Room>
		</Grid>
	)
}
