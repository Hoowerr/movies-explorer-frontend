const badRequestError = 'Ошибка: 400';
const unathorizedError = 'Ошибка: 401';
const forbiddenError = 'Ошибка: 403';
const notFoundError = 'Ошибка: 404';
const conflictError = 'Ошибка: 409';
const internalServerMessage = 'На сервере произошла ошибка';
const invalidFilmDataMessage =
  'Переданы некорректные данные при добавлении фильма';
const invalidIdMessage = 'Невалидный id';
const filmIdNotFoundMessage = 'Фильм с указанным _id не найден';
const deleteForeignFilmMessage =
  'Удаление фильмов других пользователей запрещено';
const invalidUpdateDataMessage =
  'Переданы некорректные данные при обновлении профиля';
const invalidCreateDataMessage =
  'Переданы некорректные данные при создании пользователя';
const userIdNotFoundMessage = 'Пользователь с указанным _id не найден';
const emailIsUsedMessage = 'Пользователь с таким email уже существует.';
const wrongEmailOrPassword = 'Вы ввели неправильный логин или пароль. ';

module.exports = {
  badRequestError,
  conflictError,
  forbiddenError,
  notFoundError,
  unathorizedError,
  internalServerMessage,
  invalidFilmDataMessage,
  invalidIdMessage,
  invalidUpdateDataMessage,
  invalidCreateDataMessage,
  filmIdNotFoundMessage,
  userIdNotFoundMessage,
  deleteForeignFilmMessage,
  emailIsUsedMessage,
  wrongEmailOrPassword,
};
