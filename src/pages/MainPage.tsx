import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import s from '../components/UserArticle/UserArticle.module.scss';
import { selectUserArticles, articleActions } from '../redux/slices/article';
import { useActionCreators } from '../redux/hooks';
import useDebounce from '../hooks/useDebounce';
import CreateArticleModal from '../components/modals/CreateArticleModal/CreateArticleModal';
import { CreateUserArticleBtn, SearchArticleInput } from '../components/UI';
import UserArticlesList from '../components/UserArticle/UserArticlesList';
import { IUserArticle } from '../@types/article';
const CreateArticleForm = () => {
	const actions = useActionCreators(articleActions);
	const articles = useAppSelector(selectUserArticles);

	const [inputValue, setInputValue] = useState<string>('');
	const [showModal, setShowModal] = useState<boolean>(false);
	const debouncedValue = useDebounce(inputValue, 600);

	const renderUserArticles = (articlesArr: IUserArticle[]) => {
		if (articlesArr.length === 0) {
			return <h1>Articles not found</h1>;
		}
		return <UserArticlesList articles={articlesArr} />;
	};

	useEffect(() => {
		actions.searchUserArticle(inputValue);
	}, [debouncedValue]);

	const modalHandler = React.useCallback(() => {
		setShowModal((prev) => !prev);
	}, []);

	const handleInputChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setInputValue(event.target.value);
		},
		[]
	);

	useEffect(() => {
		if (debouncedValue?.length === 0) {
			localStorage.setItem('articles', JSON.stringify(articles));
		}
	}, [articles]);
	return (
		<>
			{showModal && <CreateArticleModal modalHandler={modalHandler} />}
			<CreateUserArticleBtn modalHandler={modalHandler} />
			<SearchArticleInput
				inputValue={inputValue}
				handleInputChange={handleInputChange}
			/>
			<div className={s.articles}>{renderUserArticles(articles)}</div>
		</>
	);
};

export default CreateArticleForm;
