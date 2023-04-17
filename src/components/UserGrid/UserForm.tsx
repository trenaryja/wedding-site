import { BoxProps, Button, Grid, Input, Text } from '@chakra-ui/react'
import { User } from '@prisma/client'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { NoMaybeYes, PhoneInput } from '..'

type UserFormProps = {
	data: User
	onSubmit: (user: User) => Promise<void>
} & Omit<BoxProps, 'onSubmit'>

export const UserForm = ({ data, onSubmit, ...props }: UserFormProps) => {
	const { register, handleSubmit, control } = useForm<User>({ defaultValues: data })

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<Error | null>()

	const submit = handleSubmit(async (user) => {
		try {
			if (error) return
			setLoading(true)
			await onSubmit(user)
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	})

	return (
		<Grid as='form' gap={5} {...props} onSubmit={submit}>
			<Grid gridTemplateColumns='1fr 1fr' gap={5} alignItems='center' justifyItems='end'>
				<Text>First</Text>
				<Input {...register('firstName')} />
				<Text>Last</Text>
				<Input {...register('lastName')} />
				<Text>Phone</Text>
				<Controller name='phone' control={control} render={({ field }) => <PhoneInput {...field} />} />
				<Text>Attending</Text>
				<Controller name='isAttending' control={control} render={({ field }) => <NoMaybeYes {...field} />} />
				<Text>+1 Allowed</Text>
				<Controller name='isPlusOneAllowed' control={control} render={({ field }) => <NoMaybeYes {...field} />} />
				<Text>+1 Attending</Text>
				<Controller name='isPlusOneAttending' control={control} render={({ field }) => <NoMaybeYes {...field} />} />
				<Text>+1 Name</Text>
				<Input {...register('plusOneName')} />
			</Grid>
			<Button disabled={loading || !!error} type='submit'>
				Save
			</Button>
		</Grid>
	)
}
