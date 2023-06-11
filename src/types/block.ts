export type Block = {
	blockId: String;
	created_at: Date;
	userId: String;
	url: String;
	collectionIds: Array<String> | null;
	title: String;
	src: String;
	objectType: String;
	updated_at: Date;
};
