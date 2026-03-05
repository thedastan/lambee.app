export interface IGeo {
	detail: IGeoDetail[];
}

export interface IGeoDetail {
	id: number;
	name: string;
	country: IGeoCountry;
}

export interface IGeoCountry {
	id: number;
	name: string;
}
