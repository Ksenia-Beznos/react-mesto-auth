import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { loginWithToken } from '../utils/apiAuth';
import { login, register } from '../utils/apiAuth';

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

	const [loggedIn, setLoggedIn] = useState(false);
	const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
	const [isStatus, setIsStatus] = useState(false);
	const [isMessage, setIsMessage] = useState('');
	const [email, setEmail] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('token'))
			loginWithToken()
				.then((res) => {
					if (res && typeof res.data === 'object') {
						setLoggedIn(true);
						navigate('/', { replace: true });
						setEmail(res.data.email);
					}
				})
				.catch((e) => console.log(e));
	}, []);

	useEffect(() => {
		if (loggedIn) {
			api
				.getUserInfo()
				.then((res) => {
					setCurrentUser(res);
				})
				.catch((err) => console.log(err));
		}
	}, [loggedIn]);

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
		setIsInfoTooltipOpen(false);
	}

	useEffect(() => {
		if (loggedIn) {
			api
				.getInitialCards()
				.then((res) => {
					setCards(res);
				})
				.catch((err) => console.log(err));
		}
	}, [loggedIn]);

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

	const handleLoginSubmit = (evt, email, password) => {
		evt.preventDefault();
		login(email, password)
			.then((res) => {
				console.log(res);
				if (res !== false) {
					setLoggedIn(true);
					localStorage.setItem('token', res.token);
					setEmail(email);
					setIsStatus(true);
					setIsMessage('Заявка на кредит одобрена');
					navigate('/', { replace: true });
					console.log(loggedIn)
				}
			})
			.catch((err) => {
				console.log(err);
				setIsStatus(false);
				setIsMessage('Это фиаско, братан :(');
			})
			.finally(() => {
				setIsInfoTooltipOpen(true);
			});
	};

	const handleSubmitRegister = (evt, email, password) => {
		evt.preventDefault();
		register(email, password)
			.then((res) => {
				if (res !== false) {
					setIsStatus(true);
					setIsMessage('Ну привет, пёс!');
					navigate('/sign-in', { replace: true });
				}
			})
			.catch((err) => {
				console.log(err);
				setIsStatus(false);
				setIsMessage('Это фиаско, братан :(');
			})
			.finally(() => {
				setIsInfoTooltipOpen(true);
			});
	};

	function signOut() {
		localStorage.removeItem('token');
		setEmail('');
	}

	return (
		<div className='page'>
			<CurrentUserContext.Provider value={currentUser}>
				<Header email={email} signOut={signOut} />

				<Routes>
					<Route
						path='/'
						element={
							<ProtectedRoute
								element={Main}
								loggedIn={loggedIn}
								onEditProfile={handleEditProfileClick}
								onAddPlace={handleAddPlaceClick}
								onEditAvatar={handleEditAvatarClick}
								onOpenImagePopup={handleCardClick}
								onCardLike={handleCardLike}
								onDeleteCard={handleCardDelete}
								cards={cards}
							/>
						}
					/>
					<Route
						path='/sign-up'
						element={
							<Register
								title='Регистрация'
								btnName='Зарегистрироваться'
								openTooltip={setIsInfoTooltipOpen}
								handleSubmit={handleSubmitRegister}
							/>
						}
					/>
					<Route
						path='/sign-in'
						element={
							<Login
								title='Вход'
								btnName='Войти'
								setLoggedIn={setLoggedIn}
								setUserEmail={setEmail}
								handleSubmit={handleLoginSubmit}
							/>
						}
					/>
					<Route
						path='*'
						element={loggedIn ? <Navigate to='/' replace /> : <Navigate to='/sign-in' replace />}
					/>
				</Routes>

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

			<InfoTooltip
				isOpen={isInfoTooltipOpen}
				onClose={closeAllPopups}
				isStatus={isStatus}
				isMessage={isMessage}
			/>

			<Footer />
		</div>
	);
}

export default App;
