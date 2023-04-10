import FailIcon from '../images/FailIcon.svg';
import SuccessIcon from '../images/SuccessIcon.svg';

function InfoTooltip({ isSuccessfully, isSuccessfullyLogin, onClose, isOpen }) {
	const signUpResult = {
		success: 'Вы успешно зарегистрировались!',
		loginSuccess: 'Заявка на кредит одобрена',
		fail: 'Это фиаско, братан.',
	};

	return (
		<div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
			<div className='popup__container popup__container-tooltip'>
				<button
					className='popup__close-icon'
					type='button'
					aria-label='Закрыть'
					onClick={onClose}
				/>
				<div>
					<img
						className='popup__image-tooltip'
						src={isSuccessfully || isSuccessfullyLogin ? SuccessIcon : FailIcon}
						alt='иконка состояния'
					/>
				</div>

				<h2 className='popup__text-tooltip'>
					{console.log(isSuccessfully, isSuccessfullyLogin)}
					{isSuccessfully && isSuccessfullyLogin
						? isSuccessfullyLogin
							? signUpResult.loginSuccess
							: signUpResult.fail
						: isSuccessfully
						? signUpResult.success
						: signUpResult.fail}
				</h2>
			</div>
		</div>
	);
}

export default InfoTooltip;
