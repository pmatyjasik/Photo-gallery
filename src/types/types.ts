export interface Photo {
	alt: string;
	avg_color: string;
	height: number;
	width: number;
	id: number;
	liked: boolean;
	photographer: string;
	photographer_id: number;
	photographer_url: string;
	src: {
		landscape: string;
		large: string;
		large2x: string;
		medium: string;
		original: string;
		portrait: string;
		small: string;
		tiny: string;
	};
	url: string;
}

export interface PhotosInterface {
	next_page: string;
	page: number;
	per_page: number;
	photos: Array<Photo>;
	total_results: number;
}

export enum LocalStorageKeys {
	LocalStorageKey = 'Photo',
}
