import { RepeatIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'
import { getMessages } from '../utils'

const MessageBubble = ({ message }: { message: MessageInstance }) => {
	const inbound = message.direction === 'inbound'

	return (
		<Flex flexDirection='column' my={1} w='100%' alignItems={inbound ? 'flex-start' : 'flex-end'}>
			<Text fontSize='xs'>
				{inbound ? 'From' : 'To'}: {inbound ? message.from : message.to}
			</Text>
			<Box p={3} maxW='80%' borderRadius={5} bgColor={inbound ? 'ButtonShadow' : 'ButtonHighlight'}>
				{message.body}
			</Box>
		</Flex>
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
			<VStack w='100%' gap={1} maxHeight={60} overflow='auto' flexDirection='column-reverse'>
				{messages?.map((message) => (
					<MessageBubble message={message} key={message.sid} />
				))}
			</VStack>
		</VStack>
	)
}
