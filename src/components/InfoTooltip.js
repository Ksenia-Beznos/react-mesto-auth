import FailIcon from '../images/FailIcon.svg';
import SuccessIcon from '../images/SuccessIcon.svg';

function InfoTooltip({ onClose, isOpen, isStatus, isMessage }) {
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
						src={isStatus ? SuccessIcon : FailIcon}
						alt='иконка состояния'
					/>
				</div>

				<h2 className='popup__text-tooltip'>{isMessage}</h2>
			</div>
		</div>
	);
}

export default InfoTooltip;
