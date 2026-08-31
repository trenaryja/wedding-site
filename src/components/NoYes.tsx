import type { ButtonProps } from '@chakra-ui/react'
import { Button, ButtonGroup, forwardRef } from '@chakra-ui/react'

const SelectionButton = ({ isSelected, ...rest }: ButtonProps & { isSelected: boolean }) => (
	<Button
		mx={10}
		outlineOffset={5}
		outline={isSelected ? 'solid' : undefined}
		variant={isSelected ? 'solid' : 'outline'}
		{...rest}
	/>
)

export type NoYesProps = Omit<ButtonProps, 'onChange' | 'value'> & {
	value: boolean | null
	onChange: (value: boolean | null) => void
}

// eslint-disable-next-line @eslint-react/no-forward-ref -- Chakra v2's own forwardRef, not React's: it also wires the `as` prop and theme resolution
export const NoYes = forwardRef(({ value, onChange, ...props }: NoYesProps, ref) => (
	<ButtonGroup ref={ref}>
		<SelectionButton {...props} onClick={() => onChange(false)} isSelected={!value}>
			No
		</SelectionButton>
		<SelectionButton {...props} onClick={() => onChange(true)} isSelected={!!value}>
			Yes
		</SelectionButton>
	</ButtonGroup>
))
