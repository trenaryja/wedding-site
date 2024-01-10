import { IconButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export const BackToTop = () => {
	const [isVisible, setIsVisible] = useState(false)
	const toggleVisibility = () => setIsVisible(window.scrollY > 0)

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility)
		return () => window.removeEventListener('scroll', toggleVisibility)
	}, [])

	if (!isVisible) return null

	return (
		<IconButton
			pos='fixed'
			bottom={5}
			right={5}
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			icon={<FaArrowUp />}
			aria-label='Scroll Back To Top'
		/>
	)
}
