import { Client } from '@notionhq/client'

export interface BaseResult {
	object: string
	id: string
}

export interface NotionUser extends BaseResult {
	created_time?: string
	last_edited_time?: string
	last_edited_by?: BaseResult
	properties: Properties
}

export interface Column {
	id?: string
	type?: string
}

export interface CheckboxColumn extends Column {
	checkbox: boolean
	type: 'checkbox'
}

export interface PhoneColumn extends Column {
	phone_number: string
	type: 'phone_number'
}

export interface TitleColumn extends Column {
	title: TextColumnInfo[]
	type: 'title'
}

export interface RichTextColumn extends Column {
	rich_text: TextColumnInfo[]
	type: 'rich_text'
}

export interface MultiSelectColumn extends Column {
	type: 'multi_select'
	multi_select: {
		name: string
		id?: string
		color?: string
	}[]
}

export interface DateColumn extends Column {
	type: 'date'
	date: {
		start: string
		end?: string
		time_zone?: string
	}
}

export interface TextColumnInfo {
	type: string
	text: {
		content: string
		link?: string
	}
	annotations?: {
		bold: boolean
		italic: boolean
		strikethrough: boolean
		underline: boolean
		code: boolean
		color: string
	}
	plain_text?: string
	href?: string
}

export interface Properties {
	IsAttending: CheckboxColumn
	IsPlusOneAttending: CheckboxColumn
	MessageToUs: RichTextColumn
	Name: TitleColumn
	Phone: PhoneColumn
	PlusOneName: RichTextColumn
	Tags: MultiSelectColumn
	LastLogin: DateColumn
}

export const notionClient = new Client({ auth: process.env.NOTION_TOKEN })
