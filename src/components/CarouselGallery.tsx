import { Image } from '@chakra-ui/react'
import { Carousel } from '@mantine/carousel'

export type CarouselGalleryProps = {
	images: string[]
}

export const CarouselGallery = ({ images }: CarouselGalleryProps) => (
	<Carousel slideSize='50%' slideGap='xl' loop align='center'>
		{images.map((item) => (
			<Carousel.Slide key={item}>
				<Image
					alt=''
					src={item}
					shadow='md'
					p='xl'
					borderRadius='md'
					objectFit='cover'
					height='100%'
					filter='grayscale(1)'
					transition='all 0.5s ease-in-out'
					_hover={{ filter: 'grayscale(0)' }}
				/>
			</Carousel.Slide>
		))}
	</Carousel>
)
