import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ title, btnName, handleSubmit }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleChangeEmail(e) {
		setEmail(e.target.value);
	}

	function handleChangePassword(e) {
		setPassword(e.target.value);
	}

	function handleSubmitRegister(e) {
		handleSubmit(e, email, password);
	}

	return (
		<form className='auth__form' noValidate onSubmit={handleSubmitRegister}>
			<h2 className='auth__title'>{title}</h2>
			<input
				className='auth__input'
				id='email'
				type='email'
				name='email'
				placeholder='Email'
				required
				onChange={handleChangeEmail}
				value={email}
			/>
			<input
				id='password'
				className='auth__input'
				type='password'
				name='password'
				placeholder='Пароль'
				required
				onChange={handleChangePassword}
				value={password}
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
