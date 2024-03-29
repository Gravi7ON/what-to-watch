import {useAppDispatch} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import {useState} from 'react';
import {CHECK_PASSWORD_VALIDITY} from '../../const';
import {toast} from 'react-toastify';

function FormSignIn() {
  const dispatch = useAppDispatch();

  const [userForm, setFormData] = useState({
    error: false,
    emailError: false,
    passwordError: false,
    formData: {
      email: '',
      password: ''
    }
  });

  const handleInputBlur = (evt: React.ChangeEvent<HTMLInputElement> & {target: {value: string; name: string}}) => {
    const {value, name} = evt.target;

    setFormData({...userForm, formData: {...userForm.formData, [name]: value}});
  };

  const handleSignInClick = (evt: {preventDefault: () => void}) => {
    evt.preventDefault();

    if (!(userForm.formData.email && /@/.test(userForm.formData.email))) {
      setFormData((prev) => ({...prev, emailError: true, error: true}));
      return;
    }

    if (!(userForm.formData.password && CHECK_PASSWORD_VALIDITY.test(userForm.formData.password))) {
      setFormData((prev) => ({...prev, emailError: false, error: true, passwordError: true}));
      return;
    }

    dispatch(loginAction(userForm.formData)).catch(
      (error) => {
        toast.warn(error);
      }
    );
  };


  const checkFormValidity = () => {
    const errorConfig = [
      {
        rule: userForm.error && userForm.emailError,
        text: 'Please enter a valid email address',
      },
      {
        rule: userForm.error && !userForm.emailError,
        text: <>We can’t recognize this email <br /> and password combination. Please try again.</>
      }
    ];
    const activeError = errorConfig.find((formError) => formError.rule);

    if (!activeError) {
      return null;
    }

    return (
      <div className="sign-in__message">
        <p>{activeError.text}</p>
      </div>
    );
  };

  return (
    <form action="#" className="sign-in__form">
      {checkFormValidity()}
      <div className="sign-in__fields">
        <div className="sign-in__field">
          <input onBlur={handleInputBlur} className="sign-in__input" type="email"
            placeholder="Email address" name="email" id="user-email"
            style={userForm.emailError ? {borderColor: '#f00'} : {borderColor: '#2b1b1b'}}
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
        </div>
        <div className="sign-in__field">
          <input onBlur={handleInputBlur} className="sign-in__input" type="password"
            placeholder="Password" name="password" id="user-password"
            style={userForm.passwordError ? {borderColor: '#f00'} : {borderColor: '#2b1b1b'}}
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
        </div>
      </div>
      <div className="sign-in__submit">
        <button className="sign-in__btn" type="submit" onClick={handleSignInClick}>Sign in</button>
      </div>
    </form>
  );
}

export default FormSignIn;
