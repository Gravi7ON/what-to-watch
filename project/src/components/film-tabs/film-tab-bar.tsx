import {Link} from 'react-router-dom';
import {TabEvent} from '../../types/films';

type TabBarProps = {
  activeTab: string;
  onTabClick: (evt: TabEvent) => void;
  titleTabs: string[];
}

function FilmTabBar({activeTab, onTabClick, titleTabs}: TabBarProps) {
  return (
    <ul className="film-nav__list">
      {
        titleTabs.map((tab, index) => (
          <li key={`${index++} - ${tab}`} className={activeTab === `${tab}` ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}>
            <Link to={'#'} className="film-nav__link" onClick={onTabClick}>{tab}</Link>
          </li>
        ))
      }
    </ul>
  );
}

export default FilmTabBar;
