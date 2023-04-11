import React from 'react';
import { MainPage, NotFoundPage, ArticlesPage } from './pages';
import { Routes, Route } from 'react-router-dom';
import { articleActions } from './redux/slices/article';
import { useActionCreators } from './redux/hooks';
import generateId from './utils/generateId';
function App() {
	const actions = useActionCreators(articleActions);
	React.useEffect(() => {
		// I set userId in localStorage(because i don't have backend) to know which article user created to correctly implement delete article logic
		const userIdLS = localStorage.getItem('userId');
		if (userIdLS) {
			const userId = JSON.parse(userIdLS);
			actions.setUserId(userId);
		} else {
			const newUserId = generateId();
			localStorage.setItem('userId', JSON.stringify(newUserId));
		}
	}, []);
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/articles" element={<ArticlesPage />} />
			<Route path={'*'} element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
