import { getMessages } from '@/utils'
import { Box, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'

const MessageBubble = ({ message }: { message: MessageInstance }) => {
	const inbound = message.direction === 'inbound'

	return (
		<VStack w='100%' alignItems={inbound ? 'flex-start' : 'flex-end'}>
			<Text fontSize='xs'>
				{inbound ? 'From' : 'To'}: {inbound ? message.from : message.to}
			</Text>
			<Box
				p={2}
				maxW='80%'
				borderRadius={5}
				color={inbound ? 'black' : 'white'}
				bgColor={inbound ? 'gray.200' : 'blue.600'}
			>
				{message.body}
			</Box>
		</VStack>
	)
}

export const Conversation = () => {
	const [messages, setMessages] = useState<MessageInstance[]>()

	useEffect(() => {
		const fetchMessages = async () => setMessages(await getMessages())
		fetchMessages()
	}, [])

	return (
		messages && (
			<VStack mt={10} w='100%' p={1} gap={1} maxHeight='50vh' overflow='auto' flexDirection='column-reverse'>
				{messages?.map((message) => (
					<MessageBubble message={message} key={message.sid} />
				))}
			</VStack>
		)
	)
}
