import { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../utils/apiAuth';

function Register({ title, btnName, openTooltip, changeTooltip, setIsSuccess }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleChangeEmail(e) {
		setEmail(e.target.value);
	}

	function handleChangePassword(e) {
		setPassword(e.target.value);
	}

	const handleSubmit = (evt) => {
		evt.preventDefault();
		register(email, password).then((res) => {
			if (res === false) {
				openTooltip(true);
				changeTooltip(false);
				setIsSuccess({ register: true, login: false });
			} else {
				changeTooltip(true);
				openTooltip(true);
				setIsSuccess({ register: false, login: false });
			}
		});
	};

	return (
		<form className='auth__form' noValidate onSubmit={handleSubmit}>
			<h2 className='auth__title'>{title}</h2>
			<input
				className='auth__input'
				id='email'
				type='email'
				name='email'
				placeholder='Email'
				required
				onChange={handleChangeEmail}
			/>
			<input
				id='password'
				className='auth__input'
				type='password'
				name='password'
				placeholder='Пароль'
				required
				onChange={handleChangePassword}
			/>

			<button className='auth__btn' type='submit'>
				{btnName}
			</button>

			<p className='auth__signin'>
				Уже зарегистрированы?
				<Link to='/sign-in' className='auth__link-enter'>
					Войти
				</Link>
			</p>
		</form>
	);
}

export default Register;
