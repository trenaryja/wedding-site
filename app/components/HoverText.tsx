import type { TextProps } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

export default function HoverText({ hoverBg, children, ...props }: TextProps & { hoverBg: any }) {
	return (
		<Text
			pos='relative'
			textDecor='none'
			_before={{
				background: hoverBg,
				content: '""',
				inset: 0,
				position: 'absolute',
				transform: 'scaleX(0)',
				transformOrigin: 'right',
				transition: 'transform 0.5s ease-in-out',
				zIndex: -1,
			}}
			_hover={{
				_before: {
					transform: 'scaleX(1)',
					transformOrigin: 'left',
				},
			}}
			{...props}
		>
			{children}
		</Text>
	)
}
