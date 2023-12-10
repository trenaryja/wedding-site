import { Box, Grid, useBreakpointValue } from '@chakra-ui/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CloudinaryImage } from '../utils'

export default function Index() {
	const [photos, setPhotos] = useState<CloudinaryImage[]>([])

	useEffect(() => {
		fetch('/api/cloudinary')
			.then((response) => response.json())
			.then((data) => setPhotos(data))
	}, [])

	const columnCount = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 5 })

	return (
		<>
			<Grid
				px={10}
				autoFlow='row dense'
				className='full-bleed'
				gridTemplateColumns={`repeat(${columnCount}, 1fr)`}
				overflow='auto'
				justifyContent='center'
				placeItems='center'
				gap={5}
				css={{
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				}}
			>
				{photos.map((photo) => (
					<Box
						borderRadius='xl'
						overflow='hidden'
						objectFit='cover'
						transition='all 0.5s ease-in-out'
						filter='grayscale(1)'
						transform='scale(.975)'
						_hover={{
							transform: 'scale(1)',
							filter: 'grayscale(0)',
						}}
						key={photo.url}
					>
						<Image width={photo.width} height={photo.height} src={photo.url} alt='wedding' />
					</Box>
				))}
			</Grid>
		</>
	)
}
