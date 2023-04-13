import logo from '../images/Logo.svg';
import { NavLink } from 'react-router-dom';

function Header({ isHomePage, email, setEmail }) {
	
	function signOut() {
		localStorage.removeItem('token');
		setEmail('');
	}

	const buttons = {
		login: 'Войти',
		register: 'Регистрация',
		logout: 'Выйти',
	};

	const home = (
		<NavLink to='/sign-in' className='header__buttons' onClick={signOut}>
			{buttons.logout}
		</NavLink>
	);

	const register = (
		<NavLink to='/sign-up' className='header__buttons'>
			{buttons.register}
		</NavLink>
	);

	const login = (
		<NavLink to='/sign-in' className='header__buttons'>
			{buttons.login}
		</NavLink>
	);
	
	return (
		<header className='header'>
			<img className='header__logo' src={logo} alt='Логотип Mesto' />
			<div className='header__text-group'>
				<p className='header__email'>{email}</p>
				{isHomePage.home ? home : ''}
				{isHomePage.register ? login : ''}
				{isHomePage.login ? register : ''}
			</div>
		</header>
	);
}

export default Header;
