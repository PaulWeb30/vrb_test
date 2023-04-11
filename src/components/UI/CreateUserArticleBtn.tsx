import React, { FC } from 'react';
import s from '../../components/UserArticle/UserArticle.module.scss';
type IProps = {
	modalHandler: () => void;
};

const CreateUserArticleBtn: FC<IProps> = ({ modalHandler }) => {
	return (
		<button className={s.createBtn} onClick={modalHandler} type="submit">
			Create Article
		</button>
	);
};

export default CreateUserArticleBtn;
