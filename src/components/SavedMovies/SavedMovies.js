import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

const SavedMovies = (props) => {
  const [queryError, setQueryError] = React.useState(false);
  return (
    <div>
      <SearchForm
        setQueryError={setQueryError}
        query={props.query}
        onUpdateSearch={props.onUpdateSearch}
        checkedState={props.checkedState}
      />
      <MoviesCardList
        queryError={queryError}
        preloader={props.preloader}
        searchedMoviesError={props.searchedMoviesError}
        onDeleteCard={props.onDeleteCard}
        savedMovies={props.savedMovies}
        cards={props.searchedMovies}
      />
    </div>
  );
};

export default SavedMovies;
