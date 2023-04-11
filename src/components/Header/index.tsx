import React from 'react';
import { Link } from 'react-router-dom';
import s from './Header.module.scss';
const Header = () => {
	return (
		<header className={s.header}>
			<div className={s.logo}>VRB</div>
			<nav className={s.nav}>
				<ul>
					<li>
						<Link to={'/'}>Home</Link>
					</li>
					<li>
						<Link to={'/articles'}>Articles</Link>
					</li>
					<li>
						<a target={'_blank'} href="https://github.com/PaulWeb30">
							Github
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
