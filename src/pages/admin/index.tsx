import { Conversation, SmsForm, UserGrid } from '@/components'
import { useSession } from '@/hooks'
import { logout } from '@/utils'
import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spinner } from '@chakra-ui/react'
import { useState } from 'react'

type ModalOption = 'twilio' | 'user' | 'sms'

export default function Index() {
	const { session, mutateSession } = useSession({
		redirectTo: '/admin/login',
		redirectIfNotAdmin: true,
	})

	const [modal, setModal] = useState<ModalOption | null>(null)

	if (!session || !session.isAdmin) return <Spinner placeSelf='center' />

	const handleLogout = async () => await mutateSession(await logout())

	return (
		<>
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

			<Flex gap={2} justifyContent='center'>
				<Button onClick={() => setModal('twilio')}>View Twilio Log</Button>
				<Button onClick={() => setModal('sms')}>Send SMS</Button>
			</Flex>

			<UserGrid />

			<Button onClick={handleLogout}>Logout</Button>
		</>
	)
}
