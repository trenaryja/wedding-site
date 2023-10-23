import { getJson, putJson } from './api'
import { NotionUser } from './notion'

export const getNotionUsers = async () => await getJson<NotionUser[]>('/api/notion')
export const updateNotionUser = async (id: string, data: NotionUser) =>
	await putJson<NotionUser>('/api/notion', { id }, { data })
