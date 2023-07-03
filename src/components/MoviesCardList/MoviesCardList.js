import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import {
  lowWidth,
  maxWidth,
  desktopColumnCount,
  mobileColumnCount,
  desktopAdditionalCount,
  mobileAdditionalCount,
} from '../../utils/constants';

const MoviesCardList = (props) => {
  const {
    cards,
    preloader,
    searchedMoviesError,
    queryError,
    onSaveCard,
    savedMovies,
    onDeleteCard,
  } = props;
  const location = useLocation().pathname;
  const [maxCards, setMaxCards] = useState(0);

  const getWidth = useCallback(() => {
    return (
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    );
  }, []);

  const useCurrentWidth = () => {
    const [width, setWidth] = useState(getWidth());

    useEffect(() => {
      const handleResize = () => {
        setWidth(getWidth());
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [getWidth]);

    return width;
  };

  const width = useCurrentWidth();

  useEffect(() => {
    if (width > maxWidth) {
      setMaxCards(desktopColumnCount);
    } else if (width <= maxWidth && width > lowWidth) {
      setMaxCards(mobileColumnCount);
    } else if (width <= lowWidth) {
      setMaxCards(mobileColumnCount);
    }
  }, [width]);

  const handleClickButton = () => {
    if (width > maxWidth) {
      setMaxCards((prevMaxCards) => prevMaxCards + desktopAdditionalCount);
    } else if (width <= maxWidth) {
      setMaxCards((prevMaxCards) => prevMaxCards + mobileAdditionalCount);
    }
  };

  const displayedMovies = cards.slice(0, maxCards);

  return (
    <div className='movies-cardList'>
      {preloader && !searchedMoviesError ? (
        <Preloader />
      ) : (
        <ul
          className={`movies-cardList__elements ${
            location === '/saved-movies'
              ? 'movies-cardList__elements_saved-movies'
              : ''
          } ${
            searchedMoviesError || cards.length === 0
              ? 'movies-cardList__elements_error'
              : ''
          }`}
        >
          {searchedMoviesError && (
            <p className='movies-cardList__error-message'>
              Во время запроса произошла ошибка. Возможно, проблема с
              соединением или сервер недоступен. Подождите немного и попробуйте
              ещё раз.
            </p>
          )}
          {queryError && cards.length === 0 && !searchedMoviesError && (
            <p className='movies-cardList__error-message'>
              Нужно ввести ключевое слово
            </p>
          )}
          {!queryError && !searchedMoviesError && cards.length === 0 && (
            <p className='movies-cardList__error-message'>Ничего не найдено</p>
          )}
          {!searchedMoviesError &&
            displayedMovies.map((card) => (
              <MoviesCard
                card={card}
                key={card.id || card._id}
                onSaveCard={onSaveCard}
                savedMovies={savedMovies}
                onDeleteCard={onDeleteCard}
              />
            ))}
        </ul>
      )}
      {cards.length > 0 &&
        cards.length > maxCards &&
        !searchedMoviesError &&
        !preloader && (
          <button
            className='movies-cardList__button'
            onClick={handleClickButton}
          >
            Еще
          </button>
        )}
    </div>
  );
};

export default MoviesCardList;
