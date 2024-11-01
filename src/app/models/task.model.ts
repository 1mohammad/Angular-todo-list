export interface TaskModel {
	title: string,
	_id?:string,
	description?: string,
	list?: string
	done?: boolean,
	date?: Date,
}