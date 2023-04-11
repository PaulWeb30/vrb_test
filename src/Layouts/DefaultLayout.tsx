import React, { FC } from 'react';
import Header from '../components/Header';
const DefaultLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="wrapper">
			<Header />
			{children}
		</div>
	);
};

export default DefaultLayout;
