import { RepeatIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'
import { getMessages } from '../utils'

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

export default function Conversation() {
	const [messages, setMessages] = useState<MessageInstance[]>()

	const handleRefresh = async () => {
		setMessages(await getMessages())
	}

	return (
		<VStack maxW='sm' borderWidth='medium' borderRadius='lg' p={5} w='100%'>
			<HStack>
				<Button leftIcon={<RepeatIcon />} onClick={handleRefresh}>
					{messages ? 'Refresh' : 'Get Messages'}
				</Button>
			</HStack>
			{messages && (
				<VStack w='100%' p={1} gap={1} maxHeight={60} overflow='auto' flexDirection='column-reverse'>
					{messages?.map((message) => (
						<MessageBubble message={message} key={message.sid} />
					))}
				</VStack>
			)}
		</VStack>
	)
}
