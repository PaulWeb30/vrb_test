import axios, { AxiosResponse } from 'axios';
import { IArticle } from '../@types/article';
import { API_URL } from '../constants';
const ArticleApi = {
	fetchArticles: async (page: number) => {
		const { data }: AxiosResponse<{ articles: IArticle[] }> = await axios.get(
			API_URL + `&page=${page}&pageSize=10`
		);
		return data;
	},
};

export default ArticleApi;
