import { IconButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export const scrollTo = (id: string): void => {
	const element = document.getElementById(id)
	const top = element?.getBoundingClientRect().top ?? 0 + window.pageYOffset

	window.scrollTo({
		top: top,
		behavior: 'smooth',
	})
}

export const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
}

export const BackToTop = () => {
	const [isVisible, setIsVisible] = useState(false)
	const toggleVisibility = () => setIsVisible(window.pageYOffset > 0)

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility)
		return () => window.removeEventListener('scroll', toggleVisibility)
	}, [])

	return isVisible ? (
		<IconButton
			pos='fixed'
			bottom={5}
			right={5}
			onClick={scrollToTop}
			icon={<FaArrowUp />}
			aria-label='Scroll Back To Top'
		/>
	) : null
}
