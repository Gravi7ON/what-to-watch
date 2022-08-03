import {Link, useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch} from '../../hooks';
import {logoutAction} from '../../store/api-actions';

function UserLogo(): JSX.Element {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  return (
    <>
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" onClick={() => navigate(AppRoute.MyList)} />
        </div>
      </li>
      <li className="user-block__item">
        <Link to='#'className="user-block__link" onClick={() => dispatch(logoutAction())}>Sign out</Link>
      </li>
    </>
  );
}

export default UserLogo;

