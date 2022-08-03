import {AuthorizationStatus} from '../../const';
import SignIn from '../../pages/sign-in/sign-in';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <SignIn />
  );
}

export default PrivateRoute;
