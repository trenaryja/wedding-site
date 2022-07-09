import { Flex, Grid, Image, Spinner, useBreakpointValue } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { chunk } from '../utils'

export default function Gallery() {
	const [images, setImages] = useState<JSX.Element[]>()
	const columnCount = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 5 })
	const albumId = 'ZY34btqj5Fk1LZBt9'
	const gap = 5

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`https://wedding-site.glitch.me/${albumId}`)
			const urls = (await response.json()) as string[]
			const results = urls.map((x, i) => (
				<Image
					borderRadius='xl'
					w='100%'
					h='100%'
					objectFit='cover'
					src={x}
					key={i}
					alt='Picture of Justin, Rachel, and Friends'
					transition={'all 0.5s ease-in-out'}
					filter='grayscale(1)'
					transform='scale(.975)'
					onError={(e) => {
						e.currentTarget.src = `https://picsum.photos/id/${i + 1}/200/300`
					}}
					_hover={{
						transform: 'scale(1)',
						filter: 'grayscale(0)',
					}}
				/>
			))
			setImages(results)
		}
		fetchData()
	}, [])

	if (!images) return <Spinner />

	return (
		<Grid
			gridTemplateColumns={`repeat(${columnCount}, 1fr)`}
			overflow='auto'
			maxH='container.sm'
			justifyContent='center'
			gap={gap}
			css={{
				'&::-webkit-scrollbar': {
					display: 'none',
				},
			}}
		>
			{chunk(images, columnCount).map((chunkOfImages, i) => (
				<Flex gap={gap} key={i} direction='column' width='100%'>
					{chunkOfImages}
				</Flex>
			))}
		</Grid>
	)
}
