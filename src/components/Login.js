import { useState } from 'react';

function Login({ title, btnName, handleSubmit }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleChangeEmail(e) {
		setEmail(e.target.value);
	}

	function handleChangePassword(e) {
		setPassword(e.target.value);
	}

	function handleLoginSubmit(e) {
		handleSubmit(e, email, password);
	}

	return (
		<form className='auth__form' noValidate onSubmit={handleLoginSubmit}>
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
		</form>
	);
}

export default Login;
