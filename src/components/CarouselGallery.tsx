import { Image } from '@chakra-ui/react'
import { Carousel } from '@mantine/carousel'

export type CarouselGalleryProps = {
	images: string[]
}

export const CarouselGallery = ({ images }: CarouselGalleryProps) => (
	<Carousel
		slideSize='25%'
		breakpoints={[
			{ maxWidth: 'xs', slideSize: '100%' },
			{ maxWidth: 'sm', slideSize: '50%' },
			{ maxWidth: 'md', slideSize: '50%' },
			{ maxWidth: 'lg', slideSize: '25%' },
			{ maxWidth: 'xl', slideSize: '25%' },
		]}
		slideGap='xl'
		loop
		align='start'
	>
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
					_hover={{
						transform: 'scale(1)',
						filter: 'grayscale(0)',
					}}
				/>
			</Carousel.Slide>
		))}
	</Carousel>
)
