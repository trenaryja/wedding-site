import { Image } from '@chakra-ui/react'

export default function Index() {
	return (
		<>
			<Image src='images/dickarm.svg' alt='dick arm' p={10} w='100%' />
			<iframe
				width='560'
				height='315'
				src='https://www.youtube.com/embed/9jlaZL7CWHY'
				title='YouTube video player'
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen={true}
			></iframe>
		</>
	)
}
