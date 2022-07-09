import { CloseButton, HStack, PinInput, PinInputField, PinInputProps } from '@chakra-ui/react'

export type OtpInputProps = Omit<PinInputProps, 'children'> & { isRequired?: boolean }

export default function OtpInput(props: OtpInputProps) {
	const { onChange, isRequired } = props

	return (
		<HStack justifyContent='center'>
			<PinInput otp size='lg' {...props}>
				<PinInputField required={isRequired} />
				<PinInputField required={isRequired} />
				<PinInputField required={isRequired} />
				<PinInputField required={isRequired} />
			</PinInput>
			<CloseButton onClick={() => onChange('')} />
		</HStack>
	)
}
