import { Box, ImageProps, useInterval } from '@chakra-ui/react'
import { useState } from 'react'

export type FadeGalleryProps = {
	urls: string[]
	duration?: number
	fadeDuration?: number
}

const commonImageProps: ImageProps = {
	h: '100%',
	inset: 0,
	position: 'absolute',
	backgroundSize: 'contain',
	backgroundPosition: 'bottom',
	backgroundRepeat: 'no-repeat',
	fontSize: '5xl',
}

export const FadeGallery = ({ urls, duration = 1000, fadeDuration }: FadeGalleryProps) => {
	const [index, setIndex] = useState(0)
	const [toggle, setToggle] = useState(true)
	const _fadeDuration = fadeDuration || duration / 2

	useInterval(() => {
		setIndex((index) => (index + 1) % (urls.length - 1))
		setToggle((toggle) => !toggle)
	}, duration)

	return (
		<Box width='100%' aspectRatio='1' position='relative'>
			<Box
				{...commonImageProps}
				backgroundImage={`url(${urls[index]})`}
				transition={`opacity ${toggle ? _fadeDuration : 0}ms`}
				opacity={toggle ? 1 : 0}
			/>
			<Box
				{...commonImageProps}
				backgroundImage={`url(${urls[index]})`}
				transition={`opacity ${!toggle ? _fadeDuration : 0}ms`}
				opacity={!toggle ? 1 : 0}
			/>
		</Box>
	)
}
