import React, { FC } from 'react';
import { IArticle } from '../../@types/article';
const ArticleItem: FC<{ article: IArticle }> = ({ article }) => {
	return (
		<div
			className="card"
			key={article?.urlToImage + article?.title.substring(0, 20) + Math.random()}
		>
			<div className="card-header">
				<img
					src={article?.urlToImage ?? 'https://via.placeholder.com/400x200'}
					alt={article?.title ?? 'Title'}
				/>
			</div>
			<div className="card-body">
				<h4>{article?.title ?? 'Title'}</h4>
				<p>{article?.description ?? 'Description'}</p>
				<div className="user">
					<div className="user-info">
						<h5>{'Author: ' + article?.author}</h5>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArticleItem;
