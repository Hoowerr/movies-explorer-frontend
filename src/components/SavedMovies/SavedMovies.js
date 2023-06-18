import { savedMovies } from '../../utils/movies';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

const SavedMovies = () => {
  const showButton = false;

  return (
    <div>
      <SearchForm />
      <MoviesCardList cards={savedMovies} showButton={showButton} />
    </div>
  );
};

export default SavedMovies;
