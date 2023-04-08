import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ isOpen, onClose, removeCard, onConfirmDelete }) {
	function handleSubmit(e) {
		e.preventDefault();
		onConfirmDelete(removeCard);
	}

	return (
		<PopupWithForm
			title='Вы уверены?'
			name='cards-delete'
			button='Да'
			label='Да'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		/>
	);
}

export default ConfirmDeletePopup;
