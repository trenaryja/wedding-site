import { Button, ButtonGroup, ButtonProps, forwardRef } from '@chakra-ui/react'

const SelectionButton = ({ isSelected, ...rest }: { isSelected: boolean } & ButtonProps) => (
	<Button
		mx={10}
		outlineOffset={5}
		outline={isSelected && 'solid'}
		variant={isSelected ? 'solid' : 'outline'}
		{...rest}
	/>
)

export type NoYesProps = Omit<ButtonProps, 'onChange' | 'value'> & {
	value: boolean | null
	onChange: (value: boolean | null) => void
}

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
