import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

const Movies = (props) => {
  const [queryError, setQueryError] = useState(true);

  return (
    <div>
      <SearchForm
        checkedState={props.checkedState}
        setQueryError={setQueryError}
        onUpdateSearch={props.onUpdateSearch}
        query={props.query}
      />
      <MoviesCardList
        savedMovies={props.savedMovies}
        onSaveCard={props.onSaveCard}
        searchedMoviesError={props.searchedMoviesError}
        cards={props.searchedMovies}
        preloader={props.preloader}
        queryError={queryError}
        onDeleteCard={props.onDeleteCard}
      />
    </div>
  );
};

export default Movies;
