import {Link} from 'react-router-dom';

type RouteUserLogoProps = {
  path: string;
}

function UserLogo({path}: RouteUserLogoProps): JSX.Element {
  return (
    <>
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link to={path} className="user-block__link">Sign out</Link>
      </li>
    </>
  );
}

export default UserLogo;

