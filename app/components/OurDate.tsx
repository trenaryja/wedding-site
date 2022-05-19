import type { BoxProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { format } from 'date-fns'
import type { ReactNode, SVGProps } from 'react'
import { useEffect } from 'react'
import { useTheme } from '~/utils/theme'
import CountDown from './CountDown'

const WEDDING_DATE = new Date('2023-11-17T05:00:00.000Z')

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
			const text = svg.querySelector('text') as SVGTextElement
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
			<CountDown w='100%' mt={10} />
		</Box>
	)
}
