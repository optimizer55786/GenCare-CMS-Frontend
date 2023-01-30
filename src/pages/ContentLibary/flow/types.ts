export type initialValuesType = {
	group: number;
	category: number;
	internal_title: string;
	published: boolean;
	tags?: string[];
	public_title: string;
	short_description: string;
	benefit_1: string;
	benefit_2: string;
	benefit_3: string;
	long_description: string;
	cover_image: string;
	thumbnail_image: string;
	add_to_daily_fuel_queue: number;
	content: [];
	settings: [
		{
			state: boolean;
		}
	];
};
