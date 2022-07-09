import { CloseButton, HStack, Input, InputGroup, InputLeftAddon, InputProps } from '@chakra-ui/react'
import { useState } from 'react'
import { formatPhoneNumber } from '../utils'

export type PhoneInputProps = Omit<InputProps, 'onChange'> & { onChange?: (value: string) => void }

export default function PhoneInput(props: PhoneInputProps) {
	const { value, onChange } = props
	const [displayValue, setDisplayValue] = useState(formatPhoneNumber(value as string))

	return (
		<HStack>
			<InputGroup>
				<InputLeftAddon>🇺🇸 +1</InputLeftAddon>
				<Input
					placeholder='(XXX) XXX-XXXX'
					{...props}
					type='tel'
					onChange={(e) => {
						const formattedPhoneNumber = formatPhoneNumber(e.target.value)
						setDisplayValue(formattedPhoneNumber)
						const phoneNumber = formattedPhoneNumber.replace(/[^\d]/g, '')
						onChange(phoneNumber)
					}}
					value={displayValue}
				/>
			</InputGroup>
			<CloseButton
				onClick={() => {
					setDisplayValue('')
					onChange('')
				}}
			/>
		</HStack>
	)
}
