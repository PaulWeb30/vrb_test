import React, { FC } from 'react';
import { IUserArticle } from '../../@types/article';
import UserArticleItem from './UserArticleItem';
type IProps = {
	articles: IUserArticle[];
};
const UserArticlesList: FC<IProps> = ({ articles }) => {
	return (
		<>
			{articles?.map((article, articleIndex) => (
				<UserArticleItem
					key={article?.id}
					article={article}
					articleIndex={articleIndex}
				/>
			))}
		</>
	);
};

export default UserArticlesList;
