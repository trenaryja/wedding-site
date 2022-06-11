import { Image } from '@chakra-ui/react'

export default function Index() {
	return (
		<>
			<Image src='dickarm.svg' alt='dick arm' p={10} w='100%' />
			<iframe
				width='100%'
				height='300'
				src='https://www.youtube.com/embed/9jlaZL7CWHY'
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen={true}
			></iframe>
		</>
	)
}
