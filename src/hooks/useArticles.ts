import React from 'react';
import {
	selectLoadingStatus,
	selectArticles,
	selectPage,
} from '../redux/slices/article';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { fetchArticlesThunk } from '../redux/slices/article';

export default function useArticles() {
	const dispatch = useAppDispatch();

	const loadingStatus = useAppSelector(selectLoadingStatus);
	const articles = useAppSelector(selectArticles);
	const page = useAppSelector(selectPage);

	React.useEffect(() => {
		dispatch(fetchArticlesThunk(null));
	}, [dispatch, page]);

	return { articles, loadingStatus };
}
