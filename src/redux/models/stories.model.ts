export interface IStories {
	detail: Detail[];
}

export interface Detail {
	id: number;
	title: string;
	link_text: any;
	link_url: any;
	preview: string;
	file: string;
	created_at: string;
}
