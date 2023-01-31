import { Flex, Grid, Image, Skeleton, useBreakpointValue } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { chunk, getImages } from '../utils'

type GalleryProps = {
	albumId: string
}

export const Gallery = ({ albumId }: GalleryProps) => {
	const [images, setImages] = useState<JSX.Element[]>()
	const columnCount = useBreakpointValue({ base: 1, sm: 2, md: 3 })
	const gap = 5

	useEffect(() => {
		const asyncUseEffect = async () => {
			const urls = await getImages(albumId)
			const results = urls.map((src, i) => (
				<Image
					borderRadius='xl'
					w='100%'
					h='100%'
					objectFit='cover'
					src={src}
					key={src}
					alt='Picture of Justin, Rachel, and Friends'
					transition='all 0.5s ease-in-out'
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
		asyncUseEffect()
	}, [albumId])

	const skeletons = [...Array(20)].map((_x, i) => <Skeleton h={200} key={i} />)

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
			{chunk(images ?? skeletons, columnCount).map((chunkOfImages, i) => (
				<Flex gap={gap} key={i} direction='column' width='100%'>
					{chunkOfImages}
				</Flex>
			))}
		</Grid>
	)
}
