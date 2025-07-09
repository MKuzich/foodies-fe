import { useSelector, useDispatch } from 'react-redux';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import { closeModal, openSignIn, openSignUp } from '../../redux/auth/authSlice';

const AuthModals = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.auth.authModal);

  const close = () => dispatch(closeModal());

  if (modalType === 'signin') {
    return <SignInModal onClose={close} onSwitch={() => dispatch(openSignUp())} />;
  }

  if (modalType === 'signup') {
    return <SignUpModal onClose={close} onSwitch={() => dispatch(openSignIn())} />;
  }

  return null;
};

export default AuthModals;