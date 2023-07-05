import { Heading, Image } from '@chakra-ui/react'

export default function Index() {
	return (
		<>
			<Heading>How it will start</Heading>
			<Image
				src='https://media3.giphy.com/media/26FL4IAAT5URD9IWY/giphy.gif?cid=ecf05e47gfydwz8fzrwdvmbakfbiqey69b4jbqbwxltlkiwk&ep=v1_gifs_search&rid=giphy.gif&ct=g'
				alt=''
				w='100%'
			/>
			<Heading>How it will end</Heading>
			<Image
				src='https://media0.giphy.com/media/eNv1X2BVtv4tDQ36Iq/giphy.gif?cid=ecf05e476tocrfku2wy5rhgqt6fyckg1tjx3sy11g61iuh3p&ep=v1_stickers_search&rid=giphy.gif&ct=s'
				alt=''
				w='100%'
			/>
		</>
	)
}
