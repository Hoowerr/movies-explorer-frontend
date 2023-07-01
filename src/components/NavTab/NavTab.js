import './NavTab.css';
import { Link } from 'react-scroll';

const NavTab = () => {
  return (
    <div className='navtab'>
      <Link
        to='aboutProject' className='navtab__link'smooth={true} duration={600}>
        О проекте
      </Link>
      <Link to='techs' className='navtab__link' smooth={true} duration={600}>
        Технологии
      </Link>
      <Link to='aboutMe' className='navtab__link' smooth={true} duration={600}>
        Студент
      </Link>
    </div>
  );
};
export default NavTab;
