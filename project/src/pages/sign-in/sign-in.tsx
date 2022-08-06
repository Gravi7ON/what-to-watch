import FormSignIn from '../../components/form-sign-in/form-sign-in';
import Logo from '../../components/logo/logo';
import {AppRoute, LOGO_CLASS_NAME} from '../../const';

function SignIn(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo path={AppRoute.Main} />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <FormSignIn />
      </div>

      <footer className="page-footer">
        <Logo path={AppRoute.Main} classTitle={LOGO_CLASS_NAME} />
      </footer>
    </div>
  );
}

export default SignIn;
