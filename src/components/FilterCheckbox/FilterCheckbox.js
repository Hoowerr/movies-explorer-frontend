import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <label className='filterCheckbox'>
      <input className='filterCheckbox__input' type='checkbox' defaultChecked />
      <span className='filterCheckbox__span'>Короткометражки</span>
    </label>
  );
};

export default FilterCheckbox;
