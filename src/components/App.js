import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
	const [cards, setCards] = useState([]);
	const [selectedCard, setSelectedCard] = useState({});
	const [removeCard, setRemoveCard] = useState({});
	const [currentUser, setCurrentUser] = useState('');

	useEffect(() => {
		api
			.getUserInfo()
			.then((res) => {
				setCurrentUser(res);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleCardClick = (card) => {
		setSelectedCard(card);
		setIsImagePopupOpen(true);
	};

	const handleEditProfileClick = () => {
		setIsEditProfilePopupOpen(true);
	};

	const handleEditAvatarClick = () => {
		setIsEditAvatarPopupOpen(true);
	};

	const handleAddPlaceClick = () => {
		setIsAddPlacePopupOpen(true);
	};

	const handleConfirmDeleteClick = () => {
		setIsConfirmDeletePopupOpen(true);
	};

	// функция закрытия попапов
	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsImagePopupOpen(false);
		setIsConfirmDeletePopupOpen(false);
	}

	useEffect(() => {
		api
			.getInitialCards()
			.then((res) => {
				setCards(res);
			})
			.catch((err) => console.log(err));
	}, []);

	function handleCardLike(card) {
		// Снова проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some((i) => i._id === currentUser._id);
		// Отправляем запрос в API и получаем обновлённые данные карточки
		api
			.changeLikeCardStatus(card._id, isLiked)
			.then((newCard) => {
				setCards((elements) =>
					elements.map((element) => (element._id === card._id ? newCard : element))
				);
			})
			.catch((err) => console.log(err));
	}

	function hadleConfirmDeleteSubmitCard(card) {
		api
			.removeCard(card._id)
			.then(() => {
				const newCards = cards.filter((element) => (element._id !== card._id ? element : ''));
				setCards(newCards);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	function handleCardDelete(card) {
		handleConfirmDeleteClick();
		setRemoveCard(card);
	}

	function handleUpdateUser({ name, about }) {
		api
			.setUserInfo(name, about)
			.then((res) => {
				setCurrentUser(res);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	function handleUpdateAvatar({ avatar }) {
		api
			.setAvatar(avatar)
			.then((res) => {
				setCurrentUser(res);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	function handleAddPlace(card) {
		api
			.addCard(card)
			.then((res) => {
				setCards([res, ...cards]);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	return (
		<div className='page'>
			<Header />

			<CurrentUserContext.Provider value={currentUser}>
				<Main
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onEditAvatar={handleEditAvatarClick}
					onOpenImagePopup={handleCardClick}
					onCardLike={handleCardLike}
					onDeleteCard={handleCardDelete}
					cards={cards}
				/>

				{/* Форма Profile */}
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>
			</CurrentUserContext.Provider>

			{/* Форма Avatar */}
			<EditAvatarPopup
				isOpen={isEditAvatarPopupOpen}
				onClose={closeAllPopups}
				onUpdateAvatar={handleUpdateAvatar}
			/>

			{/* Форма Delete-card */}
			<ConfirmDeletePopup
				isOpen={isConfirmDeletePopupOpen}
				onClose={closeAllPopups}
				onConfirmDelete={hadleConfirmDeleteSubmitCard}
				removeCard={removeCard}
			/>

			{/* Форма Cards */}
			<AddPlacePopup
				isOpen={isAddPlacePopupOpen}
				onClose={closeAllPopups}
				onAddPlace={handleAddPlace}
			/>

			<ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard} />

			<Footer />
		</div>
	);
}

export default App;
