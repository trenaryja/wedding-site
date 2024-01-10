import { formatPhoneNumber } from '@/utils'
import { CloseButton, Input, InputGroup, InputLeftAddon, InputProps, forwardRef } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'

export type PhoneInputProps = Omit<InputProps, 'value' | 'defaultValue'> & {
	value?: string
	defaultValue?: string
	showClearButton?: boolean
}

export const PhoneInput = forwardRef(
	({ value, defaultValue, onChange, showClearButton = true, ...props }: PhoneInputProps, ref) => {
		const [displayValue, setDisplayValue] = useState(formatPhoneNumber(defaultValue ?? value ?? ''))

		return (
			<InputGroup justifyContent='center' placeItems='center'>
				<InputLeftAddon>🇺🇸 +1</InputLeftAddon>
				<Input
					type='tel'
					width='auto'
					placeholder='(XXX) XXX-XXXX'
					onChange={(e) => {
						const formattedPhoneNumber = formatPhoneNumber(e.target.value)
						setDisplayValue(formattedPhoneNumber)
						const phoneNumber = formattedPhoneNumber.replace(/[^\d]/g, '')
						onChange({ ...e, target: { ...e.target, value: phoneNumber } })
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
							onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
						}}
					/>
				)}
			</InputGroup>
		)
	},
)
