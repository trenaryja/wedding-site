// const useStyles = makeStyles((theme: Theme) =>
// 	createStyles({
// 		backToTop: {
// 			position: 'fixed',
// 			bottom: theme.spacing(2),
// 			right: theme.spacing(2),
// 		},
// 	}),
// )

import { IconButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export function scrollTo(id: string): void {
	const element = document.getElementById(id)
	const top = element?.getBoundingClientRect().top ?? 0 + window.pageYOffset

	window.scrollTo({
		top: top,
		behavior: 'smooth',
	})
}

export function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
}

export default function BackToTop() {
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
			aria-label={'Scroll Back To Top'}
		/>
	) : null
}
