import {Link} from 'react-router-dom';

type RouteLogoProps = {
  path?: string;
  classTitle?: string;
}

function Logo({path, classTitle}: RouteLogoProps): JSX.Element {
  if (classTitle) {
    return (
      <>
        <div className="logo">
          <Link to={path || '#'} className={`logo__link ${classTitle}`}>
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>
        <div className="copyright">
          <p>© 2022 What to watch Ltd.</p>
        </div>
      </>
    );
  }

  return (
    <div className="logo">
      <Link to={path || '#'} className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
