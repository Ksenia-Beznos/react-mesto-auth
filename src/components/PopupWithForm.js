function PopupWithForm({name, title, isOpen, onClose, label, button, children, onSubmit}) {
	return (
		<div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
			<div className='popup__container'>
				<button
					className={`popup__close-icon popup__close-icon_type_${name}`}
					type='button'
					aria-label='Закрыть'
					onClick={onClose}
				/>
				<h2 className='popup__heading'>{title}</h2>

				<form className={`popup__form popup__form_type_${name}}`} name={name} onSubmit={onSubmit}>
					{children}
					<button className='popup__submit-button' type='submit' aria-label={label}>
						{button}
					</button>
				</form>
			</div>
		</div>
	);
}

export default PopupWithForm;
