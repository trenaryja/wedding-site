import { Grid, Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function Gallery() {
	const [images, setImages] = useState<JSX.Element[]>()
	const albumId = 'ZY34btqj5Fk1LZBt9'

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`https://wedding-site.glitch.me/${albumId}`)
			const urls = (await response.json()) as string[]
			const results = urls.map((x, i) => (
				<Image w='100%' h='100%' objectFit='cover' src={x} key={i} alt='Picture of Justin, Rachel, and Friends' />
			))
			setImages(results)
		}
		fetchData()
	}, [])

	if (!images) return <></>

	return (
		<Grid overflow='auto' maxH='container.sm' alignItems='center'>
			{images}
		</Grid>
	)
}
