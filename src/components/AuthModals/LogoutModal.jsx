import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/auth/authActions';
import { ModalPortal } from '../ModalPortal/ModalPortal';
import cn from 'classnames';
import useMediaQuery from '../../hooks/useMediaQuery'
import s from './index.module.css';
import Icon from '../Icon';


const SignInModal = ({ onClose }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
	const { loading, error } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleKeyClose = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleLogout = () => dispatch(userLogout());

  return (
    <ModalPortal>
      <div className={s.modalBackdrop} onMouseDown={onClose} onKeyDown={handleKeyClose} tabIndex="0">
        <div className={cn(s.modal, s.logoutModal)} onMouseDown={(e) => e.stopPropagation()}>
          <button className={s.close} onClick={onClose}>
            <Icon name="x" />
          </button>
          <h2 className={s.title}>
            {isMobile ? 'Log out' : 'Are you logging out?'}
          </h2>
          <p className={s.bottomText}>You can always log back in at my time.</p>
          <div>
            <button className={s.buttonSubmit} type="button" onClick={handleLogout} disabled={loading}>Log out</button>
            <button className={s.buttonCancel} type="button" onClick={onClose}>Cancel</button>
          </div>
          {error && <p className={s.errorForm}>{error}</p>}
        </div>
      </div>
    </ModalPortal>
  );
};

export default SignInModal