export type Collection = {
	collectionId: string;
	created_at: Date;
	userId: String;
	description: String;
	collectionIds: Array<String> | null;
	title: String;
	objectType: String;
	updated_at: Date;
};
