import { useState } from 'react';
import { login } from '../utils/apiAuth';

function Login({ title, btnName, openTooltip, changeTooltipLogin }) {
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
		login(email, password).then((res) => {
			console.log(res)
			if (res === false) {
				openTooltip(true);
				changeTooltipLogin(false);
			} else {
				changeTooltipLogin(true);
				openTooltip(true);
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
		</form>
	);
}

export default Login;
