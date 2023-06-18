import cover1 from '../images/movie1.jpg';
import cover2 from '../images/movie2.jpg';
import cover3 from '../images/movie3.jpg';
import cover4 from '../images/movie4.jpg';
import cover5 from '../images/movie5.jpg';
import cover6 from '../images/movie6.jpg';
import cover7 from '../images/movie7.jpg';

const movies = [
  {
    name: '33 слова о дизайне',
    src: cover1,
    duration: '1ч 42м',
    liked: true,
    _id: 1,
  },
  {
    name: 'Киноальманах «100 лет дизайна»',
    src: cover2,
    duration: '1ч 42м',
    liked: true,
    _id: 2,
  },
  {
    name: 'В погоне за Бенкси',
    src: cover3,
    duration: '1ч 42м',
    liked: false,
    _id: 3,
  },
  {
    name: 'Баския: Взрыв реальности',
    src: cover4,
    duration: '1ч 42м',
    liked: false,
    _id: 4,
  },
  {
    name: 'Бег это свобода',
    src: cover5,
    duration: '1ч 42м',
    liked: true,
    _id: 5,
  },
  {
    name: 'Книготорговцы',
    src: cover6,
    duration: '1ч 42м',
    liked: false,
    _id: 6,
  },
  {
    name: 'Когда я думаю о Германии ночью',
    src: cover7,
    duration: '1ч 42м',
    liked: false,
    _id: 7,
  },
];

const savedMovies = [
  {
    name: '33 слова о дизайне',
    src: cover1,
    duration: '1ч 42м',
    liked: true,
    _id: 10,
  },
  {
    name: 'Киноальманах «100 лет дизайна»',
    src: cover2,
    duration: '1ч 42м',
    liked: true,
    _id: 11,
  },
  {
    name: 'В погоне за Бенкси',
    src: cover3,
    duration: '1ч 42м',
    liked: true,
    _id: 12,
  },
];

export { movies, savedMovies };
