import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = () => {
  return (
    <form className='searchForm'>
      <div className='searchForm__search'>
        <input
          placeholder='Фильм'
          type='search'
          className='searchForm__input'
          required
        ></input>
        <button className='searchForm__button'></button>
      </div>
      <FilterCheckbox />
    </form>
  );
};

export default SearchForm;
