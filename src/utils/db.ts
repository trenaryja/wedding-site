import { User } from '@prisma/client'
import { deleteJson, getJson, postJson, putJson } from './api'
import { NotionUser } from './notion'

export const getUsers = async () => await getJson<User[]>('/api/db/users')

export const getUser = async (id: number) => await getJson<User>('/api/db/user', { id })
export const createUser = async (data: User) => await postJson<User>('/api/db/user', { data })
export const updateUser = async (id: number, data: User) => await putJson<User>('/api/db/user', { id }, { data })
export const deleteUser = async (id: number) => await deleteJson<User>('/api/db/user', { id })

export const getNotionUsers = async () => await getJson<NotionUser[]>('/api/notion')
export const updateNotionUser = async (id: string, data: NotionUser) =>
	await putJson<NotionUser>('/api/notion', { id }, { data })
