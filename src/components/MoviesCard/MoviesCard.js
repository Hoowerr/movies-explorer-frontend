import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import getTimeFromMins from '../../utils/conversionTime';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './MoviesCard.css';

const MoviesCard = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const { card, savedMovies, onSaveCard, onDeleteCard } = props;
  const location = useLocation().pathname;
  const savedMovie = savedMovies.find(
    (id) => id.movieId === card.id && id.owner._id === currentUser._id
  );
  const [isSaved, setIsSaved] = React.useState(!!savedMovie);

  const handleClick = () => {
    setIsSaved((prevState) => !prevState);
    onSaveCard(card);
  };

  const handleDeleteCard = () => {
    onDeleteCard(card);
  };

  return (
    <div className='movie__container'>
      <div className='movie-card__caption'>
        <p className='movie-card__name'>{card.nameRU}</p>
        <p className='movie-card__duration'>{getTimeFromMins(card.duration)}</p>
        {location === '/saved-movies' && (
          <button
            className='movie-card__button movie-card__button_delete'
            onClick={handleDeleteCard}
          ></button>
        )}
        {location === '/movies' && (
          <button
            onClick={handleClick}
            className={`movie-card__button ${
              isSaved ? 'movie-card__button_save' : 'movie-card__button_like'
            }`}
          ></button>
        )}
      </div>
      <a target='_blank' rel='noreferrer' href={card.trailerLink}>
        <img
          className='movie-card__image'
          src={`${
            card.image.url === undefined
              ? card.image
              : 'https://api.nomoreparties.co' + card.image.url
          }`}
          alt={card.image.name === undefined ? card.nameRU : card.image.name}
        />
      </a>
    </div>
  );
};

export default MoviesCard;
