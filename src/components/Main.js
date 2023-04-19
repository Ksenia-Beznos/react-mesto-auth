import { useContext, useEffect } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
	onEditAvatar,
	onEditProfile,
	onAddPlace,
	onOpenImagePopup,
	onDeleteCard,
	onCardLike,
	cards,
}) {
	const currentUser = useContext(CurrentUserContext);

	return (
		<main className='content'>
			{/* Section Profile */}
			<section className='profile'>
				<div className='profile__avatar-outside'>
					<button
						className='profile__avatar-button'
						type='button'
						aria-label='Изменить аватар'
						onClick={onEditAvatar}
					>
						<img className='profile__avatar' src={currentUser.avatar} alt='Аватар' />
					</button>
				</div>
				<div className='profile__container'>
					<div className='profile__info'>
						<h1 className='profile__title'>{currentUser.name}</h1>
						<p className='profile__subtitle'>{currentUser.about}</p>
						<button
							className='profile__edit-button'
							type='button'
							aria-label='Изменить'
							onClick={onEditProfile}
						></button>
					</div>
					<button
						className='profile__add-button'
						type='button'
						aria-label='Добавить'
						onClick={onAddPlace}
					></button>
				</div>
			</section>

			{/* Section Card */}
			<section className='elements'>
				<ul className='element'>
					{cards.map((card) => {
						return (
							<Card
								key={card._id}
								card={card}
								onCardClick={onOpenImagePopup}
								onDeleteCard={onDeleteCard}
								onCardLike={onCardLike}
							/>
						);
					})}
				</ul>
			</section>
		</main>
	);
}

export default Main;
