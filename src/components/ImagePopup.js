function ImagePopup(props) {
	return (
		<div className={`popup popup_type_image ${props.isOpen ? 'popup_opened' : ''}`}>
			<figure className='popup__container-image'>
				<img className='popup__photo' src={props.card.link} alt={props.card.name} />
				<figcaption className='popup__figcap'>{props.card.name}</figcaption>
				<button
					className='popup__close-icon popup__close-icon_type_image'
					type='button'
					aria-label='Закрыть'
					onClick={props.onClose}
				/>
			</figure>
		</div>
	);
}

export default ImagePopup;
