import logo from '../images/Logo.svg';
import { NavLink, Route, Routes } from 'react-router-dom';

function Header({ email, signOut }) {
	const buttons = {
		login: 'Войти',
		register: 'Регистрация',
		logout: 'Выйти',
	};

	return (
		<header className='header'>
			<img className='header__logo' src={logo} alt='Логотип Mesto' />
			<div className='header__text-group'>
				<p className='header__email'>{email}</p>
				<Routes>
					<Route
						path='/'
						element={
							<NavLink to='/sign-in' className='header__buttons' onClick={signOut}>
								{buttons.logout}
							</NavLink>
						}
					/>
					<Route
						path='/sign-in'
						element={
							<NavLink to='/sign-up' className='header__buttons'>
								{buttons.register}
							</NavLink>
						}
					/>
					<Route
						path='/sign-up'
						element={
							<NavLink to='/sign-in' className='header__buttons'>
								{buttons.login}
							</NavLink>
						}
					/>
				</Routes>
			</div>
		</header>
	);
}

export default Header;
