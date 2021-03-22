export interface UserItf {
	readonly _id?: string;
	first_name?: string;
	last_name?: string;
	email: string;
	token?: string;
	pwd?: string;
	last_connection?: Date;
	rights?: number;
	annotationsId?: [];
	imagesId?: string[]
}
