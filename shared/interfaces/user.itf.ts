export interface UserItf {
	first_name?: string;
	last_name?: string;
	email: string;
	token?: string;
	pwd?: string;
	last_connection?: Date;
	rights?: number;
}
