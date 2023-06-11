export type Block = {
	blockId: string;
	created_at: Date;
	userId: string;
	url: string;
	collectionIds: Array<string> | null;
	title: string;
	src: string;
	objectType: string;
	updated_at: Date;
};
