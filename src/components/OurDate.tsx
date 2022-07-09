import { Box, BoxProps } from '@chakra-ui/react'
import { format } from 'date-fns'
import { ReactNode, SVGProps, useEffect } from 'react'
import { useTheme } from '../utils'
import CountDown from './CountDown'

const WEDDING_DATE = new Date('2023-11-18T05:00:00.000Z')

const SvgText = ({ children, value, ...props }: SVGProps<SVGTextElement> & { value: ReactNode }) => {
	const theme = useTheme()
	return (
		<svg className='svg-text'>
			<text fill={theme.colors.white} {...props}>
				{value ?? children}
			</text>
		</svg>
	)
}

export default function OurDate(props: BoxProps) {
	useEffect(() => {
		document.querySelectorAll('.svg-text').forEach((svg) => {
			const text = svg.querySelector('text')
			const bbox = text.getBBox()
			svg.setAttribute('viewBox', [bbox.x, bbox.y, bbox.width, bbox.height].join(' '))
		})
	}, [])

	return (
		<Box w='100%' border='8px' p={5} {...props}>
			<SvgText fontWeight={900} value={format(WEDDING_DATE, 'M/d/y')} />
			<SvgText fontWeight={100} value={format(WEDDING_DATE, 'EEEE')} />
			<SvgText fontWeight={500} value={format(WEDDING_DATE, 'MMMM')} />
			<SvgText fontWeight={900} value={format(WEDDING_DATE, 'do')} />
			<SvgText fontWeight={500} value={format(WEDDING_DATE, 'y')} />
			<CountDown />
		</Box>
	)
}
