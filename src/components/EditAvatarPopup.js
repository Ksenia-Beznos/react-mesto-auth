import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
	const currentAvatar = useRef();

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateAvatar({
			avatar: currentAvatar.current.value
		});
	}

	return (
		<PopupWithForm
			title='Обновить аватар'
			name='avatar'
			button='Сохранить'
			label='Сохранить'
			isOpen={isOpen}
			onClose={onClose}
      onSubmit={handleSubmit}
		>
			<input
				id='link-input-avatar'
				className='popup__input popup__input_type_link'
				type='url'
				name='linkInputAvatar'
				placeholder='Ссылка на картинку'
				required
				ref={currentAvatar}
			/>
			<span className='link-input-avatar-error popup__input-error'></span>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;
