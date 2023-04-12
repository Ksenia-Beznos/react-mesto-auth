import logo from '../images/Logo.svg';

function Header() {
const buttons = {
	login: 'Войти',
	register: 'Регистрация',
	relogin: 'Выйти'
}

	return (
		<header className='header'>
			<img className='header__logo' src={logo} alt='Логотип Mesto' />
			<p className='header__buttons'>{buttons.register}</p>
		</header>
	);
}

export default Header;
