export interface ApiResponse {
	error: boolean;
	msg: string;
	data: Country[] | string[];
}

export interface Country {
	name: string;
	Iso2: string;
	Iso3: string;
}
