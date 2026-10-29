import { formatPhoneNumber } from '@/utils'
import type { InputProps } from '@chakra-ui/react'
import { CloseButton, forwardRef, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { useState } from 'react'

export type PhoneInputProps = Omit<InputProps, 'defaultValue' | 'onChange' | 'value'> & {
	value?: string
	defaultValue?: string
	onChange?: (phoneNumber: string) => void
	showClearButton?: boolean
}

// Chakra v2's forwardRef, not React's: it also wires the `as` prop and theme resolution
export const PhoneInput = forwardRef(
	({ value = '', defaultValue = value, onChange, showClearButton = true, ...props }: PhoneInputProps, ref) => {
		const [displayValue, setDisplayValue] = useState(() => formatPhoneNumber(defaultValue))

		return (
			<InputGroup justifyContent='center' placeItems='center'>
				<InputLeftAddon>🇺🇸 +1</InputLeftAddon>
				<Input
					type='tel'
					width='auto'
					placeholder='(XXX) XXX-XXXX'
					onChange={(e) => {
						const formattedPhoneNumber = formatPhoneNumber(e.target.value) ?? ''
						setDisplayValue(formattedPhoneNumber)
						onChange?.(formattedPhoneNumber.replaceAll(/\D/g, ''))
					}}
					ref={ref}
					value={displayValue}
					{...props}
				/>
				{showClearButton && (
					<CloseButton
						ml={1}
						onClick={() => {
							setDisplayValue('')
							onChange?.('')
						}}
					/>
				)}
			</InputGroup>
		)
	},
)
