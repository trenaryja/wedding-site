export type BaseResult = {
	object?: string
	id?: string
}

export type NotionUser = BaseResult & {
	created_time?: string
	last_edited_time?: string
	last_edited_by?: BaseResult
	properties?: Properties
}

export type Column = {
	id?: string
	type?: string
}

export type CheckboxColumn = Column & {
	checkbox?: boolean
	type?: 'checkbox'
}

export type PhoneColumn = Column & {
	phone_number?: string
	type?: 'phone_number'
}

export type TitleColumn = Column & {
	title?: TextColumnInfo[]
	type?: 'title'
}

export type RichTextColumn = Column & {
	rich_text?: TextColumnInfo[]
	type?: 'rich_text'
}

export type SelectOption<TName> = {
	id?: string
	name?: TName | null
	color?: string
}

export type SelectColumn<TOptions> = Column & {
	type?: 'select'
	select?: SelectOption<TOptions>
}

export type MultiSelectColumn<TOptions> = Column & {
	type?: 'multi_select'
	multi_select?: SelectOption<TOptions>[]
}

export type DateColumn = Column & {
	type?: 'date'
	date?: {
		start?: string
		end?: string
		time_zone?: string
	}
}

export type TextColumnInfo = {
	type?: string
	text?: {
		content?: string
		link?: string
	}
	annotations?: {
		bold?: boolean
		italic?: boolean
		strikethrough?: boolean
		underline?: boolean
		code?: boolean
		color?: string
	}
	plain_text?: string
	href?: string
}

export const SUIT_STATUSES = ['Not Started', 'Booked Fitting', 'Fitted', 'Ordered/Paid', 'Picked Up', 'Dropped Off']
export type SuitStatus =
	| 'Booked Fitting'
	| 'Dropped Off'
	| 'Fitted'
	| 'Not Started'
	| 'Ordered/Paid'
	| 'Picked Up'
	| ((string & NonNullable<unknown>) | null)

export type Properties = {
	IsAttending?: CheckboxColumn
	IsPlusOneAttending?: CheckboxColumn
	MessageToUs?: RichTextColumn
	Name?: TitleColumn
	Phone?: PhoneColumn
	PlusOneName?: RichTextColumn
	Tags?: MultiSelectColumn<string>
	LastLogin?: DateColumn
	LastContacted?: DateColumn
	SuitStatus?: SelectColumn<SuitStatus>
	IsNotAttending?: CheckboxColumn
}
