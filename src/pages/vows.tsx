/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay, IconButton, Link, useDisclosure } from '@chakra-ui/react'
import { AnchorHTMLAttributes, ClassAttributes } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { RxExternalLink } from 'react-icons/rx'
import { ExtraProps, Options } from 'react-markdown'
import { useMarkDown, useSession } from '../hooks'
import { combinePaths } from '../utils'

const DrawerLink = ({
	children,
	href,
	parentHref,
}: ClassAttributes<HTMLAnchorElement> &
	AnchorHTMLAttributes<HTMLAnchorElement> &
	ExtraProps & { parentHref?: string }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { data } = useMarkDown(combinePaths(parentHref, href), markDownOptions(parentHref))

	return (
		<>
			<Link onClick={onOpen}>{children}</Link>
			<Drawer size='lg' placement='right' isOpen={isOpen} onClose={onClose}>
				<DrawerOverlay backdropFilter='blur(.25rem)' />
				<DrawerContent
					roundedLeft='xl'
					borderLeft='thin solid'
					borderColor='ActiveBorder'
					bg={'blackAlpha.500'}
					backdropFilter='blur(.5rem)'
					p={3}
				>
					<DrawerBody>{data}</DrawerBody>
					<IconButton
						pos='fixed'
						bottom={5}
						right={5}
						onClick={onClose}
						icon={<AiOutlineClose />}
						aria-label='Close Drawer'
					/>
				</DrawerContent>
			</Drawer>
		</>
	)
}

const markDownOptions = (parentHref?: string) =>
	({
		components: {
			a: (props) =>
				!props.href.endsWith('.md') ? (
					<Link href={props.href} target='_blank'>
						{props.children} <RxExternalLink style={{ display: 'inline-block' }} />
					</Link>
				) : (
					<DrawerLink parentHref={parentHref} {...props} />
				),
		},
	}) satisfies Options

export default () => {
	useSession({
		redirectTo: '/rsvp/login',
		redirectIfNotLoggedIn: true,
	})
	const { data, error, isLoading } = useMarkDown(undefined, markDownOptions())

	if (isLoading) return <div>loading...</div>
	if (error) return <div>error</div>
	return data
}
