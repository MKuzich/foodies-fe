import { useSelector, useDispatch } from 'react-redux';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import LogoutModal from './LogoutModal';
import { closeModal, openSignIn, openSignUp } from '../../redux/auth/authSlice';

const AuthModals = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.auth.authModal);

  const close = () => dispatch(closeModal());

  const handleOpenSignIn = () => dispatch(openSignIn());
  
  const handleOpenSignUp = () => dispatch(openSignUp());

  if (modalType === 'signin') {
    return <SignInModal onClose={close} onSwitch={handleOpenSignUp} />;
  }

  if (modalType === 'signup') {
    return <SignUpModal onClose={close} onSwitch={handleOpenSignIn} />;
  }
  
  if (modalType === 'logout') {
    return <LogoutModal onClose={close} />;
  }

  return null;
};

export default AuthModals;