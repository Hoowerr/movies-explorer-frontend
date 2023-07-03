import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

const SearchForm = (props) => {
  const location = useLocation().pathname;
  const [query, setQuery] = useState(props.query);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    props.onUpdateSearch(query, props.checkedState, location);
  };

  const handleSearchChangeShort = () => {
    props.onUpdateSearch(query, !props.checkedState, location);
  };

  return (
    <form className='searchForm' onSubmit={handleSearchSubmit}>
      <div className='searchForm__search'>
        <input
          placeholder='Фильм'
          type='search'
          id='search'
          value={query || ''}
          className='searchForm__input'
          required
          onChange={handleSearchChange}
        />
        <button type='submit' className='searchForm__button'></button>
      </div>
      <div className='searchForm__checkbox-container'>
        <label className='searchForm__checkbox'>
          <input
            className='searchForm__checkbox-input'
            checked={props.checkedState}
            onChange={handleSearchChangeShort}
            type='checkbox'
          />
          <span className='searchForm__checkbox-span'>Короткометражки</span>
        </label>
      </div>
    </form>
  );
};

export default SearchForm;
