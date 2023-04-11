import React from 'react';
import { IArticle } from '../@types/article';
import useArticles from '../hooks/useArticles';
import ArticlesList from '../components/Article/ArticlesList';

const ArticlesPage = () => {
	const { loadingStatus, articles } = useArticles();

	const renderArticles = (articlesArr: IArticle[]) => {
		if (loadingStatus === 'loading') {
			return <h1>Loading...</h1>;
		}
		if (loadingStatus === 'error') {
			return <h1>Error from NewsApi.org</h1>;
		}
		if (!articlesArr) {
			return <h1>Articles not found</h1>;
		}
		return <ArticlesList articles={articlesArr} />;
	};

	return renderArticles(articles);
};

export default ArticlesPage;

