import { Input, InputGroup, InputLeftAddon, InputProps } from '@chakra-ui/react'
import { useState } from 'react'
import { formatPhoneNumber } from '../utils'

export default function PhoneInput(props: InputProps) {
	const { value, onChange } = props
	const [displayValue, setDisplayValue] = useState(formatPhoneNumber(value as string))

	return (
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
					const returnEvent = { ...e, target: { ...e.target, value: phoneNumber } }
					onChange(returnEvent)
				}}
				value={displayValue}
			/>
		</InputGroup>
	)
}
