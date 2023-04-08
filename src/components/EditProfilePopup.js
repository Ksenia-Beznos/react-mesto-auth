import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
	const currentUser = useContext(CurrentUserContext);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen]);

	function handleChangeName(e) {
		setName(e.target.value);
	}

	function handleChangeDescription(e) {
		setDescription(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateUser({
			name,
			about: description,
		});
	}

	return (
		<PopupWithForm
			title='Редактировать профиль'
			name='profile'
			button='Сохранить'
			label='Сохранить'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				id='name-input'
				className='popup__input popup__input_type_name'
				type='text'
				name='nameInput'
				placeholder='Имя'
				required
				minLength='2'
				maxLength='40'
				value={name || ''}
				onChange={handleChangeName}
			/>
			<span className='name-input-error popup__input-error'></span>
			<input
				id='text-input'
				className='popup__input popup__input_type_job'
				type='text'
				name='jobInput'
				placeholder='О себе'
				required
				minLength='2'
				maxLength='200'
				value={description || ''}
				onChange={handleChangeDescription}
			/>
			<span className='text-input-error popup__input-error'></span>
		</PopupWithForm>
	);
}

export default EditProfilePopup;
