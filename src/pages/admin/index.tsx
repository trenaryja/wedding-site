import {
	Button,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Spinner,
	VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Conversation, SmsForm, UserGrid } from '../../components'
import { useSession } from '../../hooks'
import { logout } from '../../utils'

type ModalOption = 'twilio' | 'user' | 'sms'

export default function Index() {
	const { session, mutateSession } = useSession({
		redirectTo: '/admin/login',
		redirectIfNotAdmin: true,
	})

	const [modal, setModal] = useState<ModalOption | null>(null)

	if (!session || !session.isAdmin) return <Spinner />

	const handleLogout = async () => await mutateSession(await logout())

	return (
		<VStack w='100%'>
			<HStack>
				<Button onClick={() => setModal('twilio')}>View Twilio Log</Button>
				<Button onClick={() => setModal('sms')}>Send SMS</Button>
			</HStack>
			<UserGrid />
			<Button onClick={handleLogout}>Logout</Button>

			<Modal isOpen={!!modal} onClose={() => setModal(null)} isCentered closeOnOverlayClick={false}>
				<ModalOverlay />
				<ModalContent bg='blackAlpha.900' border={'1px'} borderColor='whiteAlpha.300'>
					<ModalCloseButton />
					<ModalBody>
						{modal === 'twilio' && <Conversation />}
						{modal === 'sms' && <SmsForm />}
					</ModalBody>
				</ModalContent>
			</Modal>
		</VStack>
	)
}
