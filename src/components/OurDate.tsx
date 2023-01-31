import { Box, BoxProps } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { CountDown } from '.'

export type OurDateProps = BoxProps & {
	lines: (string | { text: string; props?: React.SVGProps<SVGTextElement> })[]
	props?: React.SVGProps<SVGTextElement>
}

export const OurDate = ({ lines, props, ...rest }: OurDateProps) => {
	const refs = useRef<Array<SVGElement | null>>([])

	useEffect(() => {
		setTimeout(() => {
			refs.current = refs.current.slice(0, lines.length)
		})
	}, [lines])

	useEffect(() => {
		refs.current.forEach((svg) => {
			const text = svg?.querySelector('text')
			const bbox = text?.getBBox()
			svg?.setAttribute('viewBox', [bbox?.x, bbox?.y, bbox?.width, bbox?.height].join(' '))
		})
	}, [lines])

	return (
		<Box w='100%' border='1px' p={5} {...rest}>
			{lines.map((line, i) => (
				<svg key={i} ref={(svg) => (refs.current[i] = svg)}>
					<text {...props} {...(typeof line === 'string' ? undefined : line.props)}>
						{typeof line === 'string' ? line : line.text}
					</text>
				</svg>
			))}
			<CountDown />
		</Box>
	)
}
