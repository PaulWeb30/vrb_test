import { selectPage } from '../../redux/slices/article';
import { articleActions } from '../../redux/slices/article';
import { useAppSelector, useActionCreators } from '../../redux/hooks';
import s from './Article.module.scss';
const ArticleUploadBtn = () => {
	const actions = useActionCreators(articleActions);
	const page = useAppSelector(selectPage);
	const uploadMoreArticles = () => {
		const newPage = page + 1;
		actions.setPage(newPage);
	};
	return (
		<>
			{page < 10 && (
				<button onClick={uploadMoreArticles} className={s.uploadBtn}>
					Upload more articles
				</button>
			)}
		</>
	);
};

export default ArticleUploadBtn;
