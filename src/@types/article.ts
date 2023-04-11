export interface IArticle {
	title: string;
	description: string;
	author: string;
	urlToImage: string;
	url: string;
	publishedAt: string;
}

export interface IUserArticle {
	id: string;
	title: string;
	author: string;
	description: string;
	image: string;
	authorId: string | null;
}
