import {Link} from 'react-router-dom';
import {TabEvent} from '../../types/films';

type TabBarProps = {
  activeTab: string;
  onTabClick: (evt: TabEvent) => void;
}

function TabBar({activeTab, onTabClick}: TabBarProps) {
  return (
    <ul className="film-nav__list">
      <li className={activeTab === 'Overview' ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
        <Link to={'#'} className="film-nav__link" onClick={onTabClick}>Overview</Link>
      </li>
      <li className={activeTab === 'Details' ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
        <Link to={'#'} className="film-nav__link" onClick={onTabClick}>Details</Link>
      </li>
      <li className={activeTab === 'Reviews' ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
        <Link to={'#'} className="film-nav__link" onClick={onTabClick}>Reviews</Link>
      </li>
    </ul>
  );
}

export default TabBar;
