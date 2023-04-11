import { FC } from 'react';
import { IArticle } from '../../@types/article';
import ArticleItem from './ArticleItem';
import ArticleUploadBtn from './ArticleUploadBtn';
import s from './Article.module.scss';
const ArticlesList: FC<{ articles: IArticle[] }> = ({ articles }) => {
	// в респонс обьєкті немає проперті id тому для key вибрав такий вираз, який на мою думку немав би повторюватись
	return (
		<>
			<div className={s.articles_container}>
				{articles?.map((el, ind) => (
					<ArticleItem
						article={el}
						key={ind + el?.url + el.description.substring(5, 25) + new Date()}
					/>
				))}
			</div>
			<ArticleUploadBtn />
		</>
	);
};

export default ArticlesList;
