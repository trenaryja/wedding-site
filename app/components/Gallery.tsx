import { Box, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
export const links = () => [{ rel: 'stylesheet', href: styles }]

export default function Gallery() {
	const [images, setImages] = useState<JSX.Element[]>()
	const albumId = 'ZY34btqj5Fk1LZBt9'

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`https://wedding-site.glitch.me/${albumId}`)
			const urls = (await response.json()) as string[]
			const results = urls.map((x, i) => <Image key={i} src={x} />)
			setImages(results)
		}
		fetchData()
	}, [])

	if (!images) return <></>

	return (
		<Box maxW='container.md'>
			<Carousel infiniteLoop={true} showThumbs={false}>
				{images}
			</Carousel>
		</Box>
	)
}
