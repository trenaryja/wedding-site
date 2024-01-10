import { Image, useBreakpointValue } from '@chakra-ui/react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

export type CarouselGalleryProps = {
	images: string[]
}

export const CarouselGallery = ({ images }: CarouselGalleryProps) => {
	const slidesToShow = useBreakpointValue({ base: 1, md: 3 })
	return (
		<Slider infinite slidesToShow={slidesToShow} slidesToScroll={1} centerMode={true}>
			{images.map((item) => (
				<Image
					key={item}
					src={item}
					rounded='3xl'
					aspectRatio={2 / 3}
					px={2}
					alt=''
					objectFit='cover'
					filter='grayscale(1)'
					transition='all 0.5s ease-in-out'
					_hover={{ filter: 'grayscale(0)' }}
				/>
			))}
		</Slider>
	)
}
