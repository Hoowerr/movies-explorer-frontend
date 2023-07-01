import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import moviesApi from '../../utils/MoviesApi';
import api from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { shortFilmTiming } from '../../utils/constants';
const {
  invalidFilmDataMessage,
  invalidUpdateDataMessage,
  internalServerMessage,
  invalidIdMessage,
  filmIdNotFoundMessage,
  invalidCreateDataMessage,
  forbiddenError,
  notFoundError,
  unathorizedError,
  deleteForeignFilmMessage,
  userIdNotFoundMessage,
  emailIsUsedMessage,
  badRequestError,
  wrongEmailOrPassword,
  conflictError,
} = require('../../utils/errors');

const App = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [preloader, setPreloader] = useState(true);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [errorTooltipPopup, setErrorTooltipPopup] = useState('');
  const [currentUser, setCurrentUser] = useState({ name: '' });
  const [apiError, setApiError] = useState('');
  const [blockForm, setBlockForm] = useState(false);
  const [searchedMoviesError, setSearchedMoviesError] = useState(false);
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [apiSuccess, setApiSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [checkedState, setCheckedState] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const closeAllPopups = () => {
    setErrorTooltipPopup('');
  };

  useEffect(() => {
    if (location === '/signin' && loggedIn) navigate('/');
    if (location === '/signup' && loggedIn) navigate('/');
  }, [location, loggedIn, navigate]);

  useEffect(() => {
    setTimeout(() => {
      tokenCheck();
    }, 100);

    const checkedStateLocal = JSON.parse(
      localStorage.getItem('checkedState') || 'false'
    );
    setCheckedState(checkedStateLocal);
    const queryLocal = JSON.parse(localStorage.getItem('query'));
    setQuery(queryLocal);
    const moviesLocal = JSON.parse(localStorage.getItem('movies') || '[]');
    setMovies(moviesLocal);
    const savedMoviesLocal = JSON.parse(
      localStorage.getItem('savedMovies') || '[]'
    );
    setSavedMovies(savedMoviesLocal);
    const filteredMoviesLocal = JSON.parse(
      localStorage.getItem('filteredMovies') || '[]'
    );
    setFilteredMovies(filteredMoviesLocal);
    const profileDataLocal = JSON.parse(
      localStorage.getItem('profileData') || '[]'
    );
    setCurrentUser(profileDataLocal);
  }, []);

  useEffect(() => {
    const checkedStateLocal = JSON.parse(
      localStorage.getItem('checkedState') || 'false'
    );
    setCheckedState(checkedStateLocal);
    const queryLocal = JSON.parse(localStorage.getItem('query'));
    setQuery(queryLocal);
  }, [location]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((profileData) => {
          setErrorTooltipPopup('');
          setCurrentUser(profileData);
          localStorage.setItem('profileData', JSON.stringify(profileData));
        })
        .catch((err) => {
          setErrorTooltipPopup(true);
          if (err === notFoundError) {
            setErrorMessage(userIdNotFoundMessage);
          } else {
            setErrorMessage(internalServerMessage);
          }
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      setPreloader(true);
      moviesApi
        .getCards()
        .then((movies) => {
          setErrorTooltipPopup('');
          setPreloader(false);
          setMovies(movies);
          localStorage.setItem('movies', JSON.stringify(movies));
        })
        .catch((err) => {
          setErrorMessage('Ошибка загрузки фильмов');
          setErrorTooltipPopup(true);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    setFilteredSavedMovies(filterSavedCards());
  }, [savedMovies]);

  useEffect(() => {
    if (loggedIn) {
      setPreloader(true);
      api
        .getMovies()
        .then((movies) => {
          setErrorTooltipPopup('');
          setPreloader(false);
          setSavedMovies(movies);
          localStorage.setItem('savedMovies', JSON.stringify(movies));
        })
        .catch(() => {
          setErrorTooltipPopup(true);
          setErrorMessage(internalServerMessage);
        });
    }
  }, [loggedIn, movies]);

  function handleRegister(data) {
    setBlockForm(true);
    auth
      .register(data)
      .then((res) => {
        setErrorMessage('Вы успешно зарегистрировались!');
        setIsSuccessful(true);
        setErrorTooltipPopup(true);
        if (res) {
          setApiError('');
          handleLogin(data);
        }
      })
      .catch((err) => {
        setErrorMessage('При регистрации произошла ошибка');
        setIsSuccessful(false);
        setErrorTooltipPopup(true);
        if (err === conflictError) {
          setApiError(emailIsUsedMessage);
        } else if (err === badRequestError) {
          setApiError(invalidCreateDataMessage);
        } else {
          setApiError(internalServerMessage);
        }
      })
      .finally(() => setBlockForm(false));
  }

  function handleLogin(data) {
    setBlockForm(true);
    auth
      .authorize(data)
      .then((authData) => {
        if (authData.token) {
          setApiError('');
          localStorage.setItem('token', authData.token);
          setLoggedIn(true);
          setEmail(data.Login);
          navigate('/movies');
        }
      })
      .catch((err) => {
        setErrorMessage('Произошла ошибка');
        setErrorTooltipPopup(true);
        setIsSuccessful(false);
        if (err === unathorizedError) {
          setApiError(wrongEmailOrPassword);
        } else {
          setApiError(internalServerMessage);
        }
      })
      .finally(() => setBlockForm(false));
  }

  function handleUpdateUser(user) {
    setBlockForm(true);
    api
      .setUserInfo(user)
      .then((user) => {
        setErrorMessage('Данные успешно обновлены!');
        setIsSuccessful(true);
        setErrorTooltipPopup(true);
        setApiError('');
        setCurrentUser(user);
        setApiSuccess(true);
      })
      .catch((err) => {
        setErrorMessage('Ошибка при обновлении данных');
        setIsSuccessful(false);
        setErrorTooltipPopup(true);
        if (err === conflictError) {
          setApiError(emailIsUsedMessage);
        } else if (err === badRequestError) {
          setApiError(invalidUpdateDataMessage);
        } else if (err === notFoundError) {
          setApiError(userIdNotFoundMessage);
        } else {
          setApiError('При обновлении профиля произошла ошибка');
        }
      })
      .finally(() => setBlockForm(false));
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
          }
        })
        .catch(() => {
          setLoggedIn(false);
        });
    } else {
      setLoggedIn(false);
    }
  }

  function handleUpdateSearch(search, checkedState, location) {
    setPreloader(true);
    setTimeout(() => {
      if (search !== '') {
        if (location === '/movies') {
          const searchMovies = movies.filter(
            (el) => el.nameRU.toLowerCase().indexOf(search.toLowerCase()) !== -1
          );
          setPreloader(false);
          setFilteredMovies(searchMovies);
          localStorage.setItem('filteredMovies', JSON.stringify(searchMovies));
          localStorage.setItem('query', JSON.stringify(search));
          checkQueryShort(checkedState, searchMovies, location);
        } else if (location === '/saved-movies') {
          setPreloader(false);
          const cards = filterSavedCards();
          const searchMovies = cards.filter(
            (el) => el.nameRU.toLowerCase().indexOf(search.toLowerCase()) !== -1
          );
          setFilteredSavedMovies(searchMovies);
          checkQueryShort(checkedState, searchMovies, location);
        }
      } else {
        if (location === '/movies') {
          setPreloader(false);
          setFilteredMovies([]);
          localStorage.setItem('filteredMovies', JSON.stringify([]));
          localStorage.setItem('query', JSON.stringify(search));
        } else if (location === '/saved-movies') {
          const cards = filterSavedCards();
          setPreloader(false);
          setFilteredSavedMovies(cards);
          checkQueryShort(checkedState, filteredSavedMovies, location);
        }
      }
    }, 500);
  }

  function filterSavedCards() {
    const cards = movies
      .map((c) => {
        const [cards_filtered] = savedMovies.filter(
          (m) => c.id === m.movieId && m.owner === currentUser._id
        );
        return cards_filtered;
      })
      .filter((card) => card !== undefined);
    return cards;
  }

  function checkQueryShort(checkedState, searchMovies, location) {
    if (checkedState) {
      const queryShort = searchMovies.filter(
        (el) => el.duration < shortFilmTiming
      );
      if (location === '/movies') {
        setFilteredMovies(queryShort);
        localStorage.setItem('filteredMovies', JSON.stringify(queryShort));
        localStorage.setItem('checkedState', JSON.stringify(true));
      } else if (location === '/saved-movies') {
        setFilteredSavedMovies(queryShort);
      }
    } else {
      localStorage.setItem('checkedState', JSON.stringify(false));
    }
  }

  function handleSaveCard(card) {
    const isSaved = savedMovies.some(
      (id) => id.movieId === card.id && id.owner._id === currentUser._id
    );

    const [savedMoviesId] = savedMovies.filter((id) => id.movieId === card.id);

    if (!isSaved) {
      api
        .saveMovie(card, !isSaved)
        .then((newMovie) => {
          setErrorTooltipPopup('');
          setSavedMovies([...savedMovies, newMovie]);
          localStorage.setItem(
            'savedMovies',
            JSON.stringify([...savedMovies, newMovie])
          );
        })
        .catch((err) => {
          setErrorTooltipPopup(true);
          if (err === badRequestError) {
            setErrorMessage(invalidFilmDataMessage);
          } else {
            setErrorMessage(internalServerMessage);
          }
        });
    } else {
      api
        .deleteMovie(savedMoviesId._id, isSaved)
        .then(() => {
          setErrorTooltipPopup('');
          setSavedMovies(savedMovies.filter((id) => id.movieId !== card.id));
          localStorage.setItem(
            'savedMovies',
            JSON.stringify(savedMovies.filter((id) => id.movieId !== card.id))
          );
        })
        .catch((err) => {
          setErrorTooltipPopup(true);
          if (err === badRequestError) {
            setErrorMessage(invalidIdMessage);
          } else if (err === notFoundError) {
            setErrorMessage(filmIdNotFoundMessage);
          } else if (err === forbiddenError) {
            setErrorMessage(deleteForeignFilmMessage);
          } else {
            setErrorMessage(internalServerMessage);
          }
        });
    }
  }

  function handleDeleteCard(card) {
    api
      .deleteMovie(card._id)
      .then(() => {
        setErrorTooltipPopup('');
        setSavedMovies(savedMovies.filter((c) => c._id !== card._id));
        localStorage.setItem(
          'savedMovies',
          JSON.stringify(savedMovies.filter((c) => c._id !== card._id))
        );
      })
      .catch((err) => {
        setErrorTooltipPopup(true);
        if (err === badRequestError) {
          setErrorMessage(invalidIdMessage);
        } else if (err === notFoundError) {
          setErrorMessage(filmIdNotFoundMessage);
        } else if (err === forbiddenError) {
          setErrorMessage(deleteForeignFilmMessage);
        } else {
          setErrorMessage(internalServerMessage);
        }
      });
  }

  function handleClickExit() {
    localStorage.clear();
    setFilteredMovies([]);
    setFilteredSavedMovies([]);
    setLoggedIn(false);
    navigate('/');
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path='/movies'
            element={
              <>
                <Header />
                <ProtectedRoute
                  savedMovies={savedMovies}
                  searchedMovies={filteredMovies}
                  checkedState={checkedState}
                  onUpdateSearch={handleUpdateSearch}
                  loggedIn={loggedIn}
                  component={Movies}
                  searchedMoviesError={searchedMoviesError}
                  onSaveCard={handleSaveCard}
                  preloader={preloader}
                  query={query}
                />
                <Footer />
              </>
            }
          />
          <Route
            path='/saved-movies'
            element={
              <>
                <Header />
                <ProtectedRoute
                  component={SavedMovies}
                  searchedMovies={filteredSavedMovies}
                  searchedMoviesError={searchedMoviesError}
                  loggedIn={loggedIn}
                  checkedState={false}
                  onDeleteCard={handleDeleteCard}
                  onUpdateSearch={handleUpdateSearch}
                  preloader={preloader}
                  savedMovies={savedMovies}
                  query={''}
                />
                <Footer />
              </>
            }
          />
          <Route
            path='/profile'
            element={
              <>
                <Header />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  blockForm={blockForm}
                  component={Profile}
                  email={email}
                  onClick={handleClickExit}
                  apiSuccess={apiSuccess}
                  apiError={apiError}
                  setApiSuccess={setApiSuccess}
                  setApiError={setApiError}
                  handleUpdateUser={handleUpdateUser}
                />
              </>
            }
          />
          <Route
            path='/signup'
            element={
              <Register
                registerError={apiError}
                setApiError={setApiError}
                handleRegister={handleRegister}
                blockForm={blockForm}
              />
            }
          />
          <Route
            path='/signin'
            element={
              <Login
                registerError={apiError}
                handleLogin={handleLogin}
                setApiError={setApiError}
                blockForm={blockForm}
              />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <InfoTooltip
        isOpen={errorTooltipPopup}
        onClose={closeAllPopups}
        message={errorMessage}
        isSuccessful={isSuccessful}
      />
    </CurrentUserContext.Provider>
  );
};

export default App;
