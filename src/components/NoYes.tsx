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

export type NoYes = {
	value: boolean | null
	onChange: (value: boolean | null) => void
}

export const NoYes = forwardRef(({ value, onChange }: NoYes, ref) => (
	<ButtonGroup ref={ref}>
		<SelectionButton onClick={() => onChange(false)} isSelected={!value}>
			No
		</SelectionButton>
		<SelectionButton onClick={() => onChange(true)} isSelected={!!value}>
			Yes
		</SelectionButton>
	</ButtonGroup>
))
