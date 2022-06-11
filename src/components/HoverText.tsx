import { Heading, Text, TextProps } from '@chakra-ui/react'

export type HoverTextProps = TextProps & { hoverBg?: string; heading?: boolean }

export default function HoverText({ hoverBg, heading, children, ...props }: HoverTextProps) {
	const Wrapper = heading ? Heading : Text
	return (
		<Wrapper
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
		</Wrapper>
	)
}
