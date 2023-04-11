import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import ArticleApi from '../../services/article';
import { IArticle, IUserArticle } from '../../@types/article';
import { RootState } from '../store';

const storedArticles = localStorage.getItem('articles');
const userArticlesInitial = storedArticles ? JSON.parse(storedArticles) : [];

type IArticleSlice = {
	articles: IArticle[];
	userArticles: IUserArticle[];
	userId: string | null;
	loadingStatus: 'idle' | 'loading' | 'error';
	page: number;
};
const initialState: IArticleSlice = {
	articles: [],
	userArticles: userArticlesInitial,
	userId: null,
	loadingStatus: 'idle',
	page: 1,
};

export const fetchArticlesThunk = createAsyncThunk<
	{ articles: IArticle[] },
	null,
	{ rejectValue: string }
>('goods/fetchAllArticles', async (_, { getState }) => {
	const state = getState() as RootState;
	const page = state.article.page;
	const data = await ArticleApi.fetchArticles(page);
	return data;
});
const articleSlice = createSlice({
	name: 'articleSlice',
	initialState,
	reducers: {
		setUserId(state, action: PayloadAction<string>) {
			state.userId = action.payload;
		},
		setUserArticles(state, action: PayloadAction<IUserArticle[] | []>) {
			state.userArticles = action.payload;
		},
		deleteUserArticle(state, action: PayloadAction<string>) {
			const articleId = action.payload;
			const articlesFiltered = state.userArticles.filter(
				(el) => el.id !== articleId
			);
			state.userArticles = articlesFiltered;
		},
		pinUserArticle(state, action: PayloadAction<string>) {
			const articleId = action.payload;
			const article =
				state.userArticles.find((el) => el.id === articleId) ??
				state.userArticles[0];
			const articlesFiltered = state.userArticles.filter(
				(el) => el.id !== article?.id
			);
			articlesFiltered.splice(0, 0, article);
			state.userArticles = articlesFiltered;
		},
		addUserArticle(state, action: PayloadAction<IUserArticle>) {
			state.userArticles.push(action.payload);
		},
		searchUserArticle(state, action: PayloadAction<string>) {
			const searchTerm = action.payload.trim();
			if (searchTerm.length >= 1) {
				const filteredArticles = state.userArticles.filter(
					(el) =>
						el.description.includes(searchTerm) || el.title.includes(searchTerm)
				);
				state.userArticles = filteredArticles;
			} else {
				state.userArticles = initialState.userArticles;
			}
		},
		setPage(state, action: PayloadAction<number>) {
			// Оскільки newsApi не дає більше 100 елементів, я роблю цю перевірку
			// І також більше не показую кнопку дозагрузки
			if (action.payload <= 10) {
				state.page = action.payload;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticlesThunk.fulfilled, (state, action) => {
				state.loadingStatus = 'idle';
				state.articles = state.articles.concat(action.payload.articles);
			})
			.addCase(fetchArticlesThunk.pending, (state) => {
				if (state.page === 1) {
					state.loadingStatus = 'loading';
				}
			})
			.addCase(fetchArticlesThunk.rejected, (state) => {
				state.loadingStatus = 'error';
			})
			.addDefaultCase(() => {});
	},
});

export const selectLoadingStatus = (state: RootState) =>
	state.article.loadingStatus;
export const selectArticles = (state: RootState) => state.article.articles;
export const selectPage = (state: RootState) => state.article.page;
export const selectUserId = (state: RootState) => state.article.userId;
export const selectUserArticles = (state: RootState) =>
	state.article.userArticles;
export const { reducer: articleReducer, actions: articleActions } =
	articleSlice;
