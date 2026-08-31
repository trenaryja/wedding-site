import type { BoxProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { CountDown } from '.'

export type OurDateProps = BoxProps & {
	lines: (string | { text: string; props?: React.SVGProps<SVGTextElement> })[]
	props?: React.SVGProps<SVGTextElement>
}

export const OurDate = ({ lines, props, ...rest }: OurDateProps) => {
	const svgElementsRef = useRef<(SVGElement | null)[]>([])

	useEffect(() => {
		svgElementsRef.current = svgElementsRef.current.slice(0, lines.length)
	}, [lines])

	useEffect(() => {
		const timeout = setTimeout(() => {
			svgElementsRef.current.forEach((svg) => {
				const text = svg?.querySelector('text')
				const bbox = text?.getBBox()
				svg?.setAttribute('viewBox', [bbox?.x, bbox?.y, bbox?.width, bbox?.height].join(' '))
			})
		}, 500)
		return () => clearTimeout(timeout)
	}, [lines])

	return (
		<Box w='100%' border='1px' p={5} {...rest}>
			{/* eslint-disable @eslint-react/no-array-index-key -- the same index subscripts svgElementsRef.current below, so the index is the identity */}
			{lines.map((line, i) => (
				<svg
					key={i}
					ref={(svg) => {
						svgElementsRef.current[i] = svg
					}}
				>
					<text {...props} {...(typeof line === 'string' ? undefined : line.props)}>
						{typeof line === 'string' ? line : line.text}
					</text>
				</svg>
			))}
			{/* eslint-enable @eslint-react/no-array-index-key */}
			<CountDown />
		</Box>
	)
}
