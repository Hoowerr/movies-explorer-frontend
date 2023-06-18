import { movies } from '../../utils/movies';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

const Movies = () => {
  const showButton = true;
  return (
    <div>
      <SearchForm />
      <Preloader />
      <MoviesCardList cards={movies} showButton={showButton} />
    </div>
  );
};
export default Movies;
