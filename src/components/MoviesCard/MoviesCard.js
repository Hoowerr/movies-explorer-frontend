import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

const MoviesCard = (props) => {
  const location = useLocation();
  const card = props.card;
  return (
    <div className='movie__container'>
      <div className='movie-card__caption'>
        <p className='movie-card__name'>{card.name}</p>
        <p className='movie-card__duration'>{card.duration}</p>
        {location.pathname === '/saved-movies' && (
          <button className='movie-card__button movie-card__button_delete'></button>
        )}
        {location.pathname === '/movies' && (
          <button
            className={`movie-card__button ${
              card.liked ? 'movie-card__button_like' : 'movie-card__button_save'
            }`}
          ></button>
        )}
      </div>
      <img className='movie-card__image' src={card.src} alt={card.name} />
    </div>
  );
};
export default MoviesCard;
