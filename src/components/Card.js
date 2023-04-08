import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';


function Card(props) {
	const currentUser = useContext(CurrentUserContext);

	const isOwn = props.card.owner._id === currentUser._id;
	const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

	const cardLikeButtonClassName = `element__heart-button ${isLiked && 'element__heart-button_active'}`;

	// открытие карточки
	function handleClick() {
		props.onCardClick(props.card);
	}

	// удаление карточки
	function handleDeleteClick() {
		props.onDeleteCard(props.card);
	}

	// лайк карточки
	function handleLikeClick() {
		props.onCardLike(props.card);
	}

	return (
		<li className='element__item'>
			<img className='element__image' src={props.card.link} alt={props.card.name} onClick={handleClick} />
			<div className='element__mask-group'>
				<h2 className='element__title'>{props.card.name}</h2>
				<div className='element__heart-button-group'>
					<button className={cardLikeButtonClassName} type='button' onClick={handleLikeClick} />
					<span className='element__heart-button-count'>{props.card.likes.length}</span>
				</div>
				{isOwn && <button className='element__trash-button' onClick={handleDeleteClick} />}
			</div>
		</li>
	);
}

export default Card;
