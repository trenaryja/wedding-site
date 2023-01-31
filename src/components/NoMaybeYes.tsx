import { Button, ButtonGroup, ButtonProps } from '@chakra-ui/react'

const SelectionButton = ({ isSelected, ...rest }: { isSelected: boolean } & ButtonProps) => (
	<Button
		mx={10}
		outlineOffset={5}
		outline={isSelected && 'solid'}
		variant={isSelected ? 'solid' : 'outline'}
		{...rest}
	/>
)

export type NoMaybeYesProps = {
	value: boolean | null
	onChange: (value: boolean | null) => void
}

export const NoMaybeYes = ({ value, onChange }: NoMaybeYesProps) => (
	<ButtonGroup>
		<SelectionButton onClick={() => onChange(false)} isSelected={value === false}>
			No
		</SelectionButton>
		<SelectionButton onClick={() => onChange(null)} isSelected={value === null}>
			Maybe
		</SelectionButton>
		<SelectionButton onClick={() => onChange(true)} isSelected={value === true}>
			Yes
		</SelectionButton>
	</ButtonGroup>
)
