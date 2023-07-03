export const BASE_URL = 'https://api.movies.hoower.nomoredomains.rocks';
// export const BASE_URL = 'http://localhost:3001';

export const response = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(response);
};

export const register = (userData) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: userData.password,
      email: userData.login,
      name: userData.name,
    }),
  }).then(response);
};

export const authorize = (userData) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: userData.password,
      email: userData.login,
    }),
  }).then(response);
};
