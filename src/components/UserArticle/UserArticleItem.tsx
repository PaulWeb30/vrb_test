import React, { FC } from 'react';
import { IUserArticle } from '../../@types/article';
import { articleActions, selectUserId } from '../../redux/slices/article';
import { useActionCreators, useAppSelector } from '../../redux/hooks';
type IProps = {
	article: IUserArticle;
	articleIndex: number;
};
const UserArticleItem: FC<IProps> = ({ article, articleIndex }) => {
	const actions = useActionCreators(articleActions);
	const userId = useAppSelector(selectUserId);
	const deleteArticle = (articleId: string) => {
		return () => {
			actions.deleteUserArticle(articleId);
		};
	};

	const pinHandler = (articleId: string) => {
		return () => {
			actions.pinUserArticle(articleId);
		};
	};
	return (
		<div className="card" key={article?.id}>
			<div className="card-header">
				<img
					src={article?.image ?? 'https://via.placeholder.com/400x200'}
					alt={article?.title ?? 'Title'}
				/>
			</div>
			<div className="card-body">
				<h4>{article?.title ?? 'Title'}</h4>
				<p>{article?.description ?? 'Description'}</p>
				<div className="user">
					<div className="user-info">
						<h5>{'Author: ' + article?.author ?? 'Author'}</h5>
						{articleIndex !== 0 && (
							<button className="card_pin" onClick={pinHandler(article?.id)}>
								Pin article
							</button>
						)}
					</div>
				</div>
			</div>
			{userId === article?.authorId && (
				<span onClick={deleteArticle(article?.id)} className="card-delete">
					X
				</span>
			)}
		</div>
	);
};

export default UserArticleItem;
