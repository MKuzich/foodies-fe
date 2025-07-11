import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/auth/authActions';
import { ModalPortal } from '../ModalPortal/ModalPortal';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cn from 'classnames';
import s from './index.module.css';
import Icon from '../Icon';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignInModal = ({ onClose, onSwitch }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

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

  const onSubmit = (data) => dispatch(userLogin(data));

  const handleKeyClose = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <ModalPortal>
      <div className={s.modalBackdrop} onMouseDown={onClose} onKeyDown={handleKeyClose} tabIndex="0">
        <div className={s.modal} onMouseDown={(e) => e.stopPropagation()}>
          <button className={s.close} onClick={onClose}>
            <Icon name="x" />
          </button>
          <h2 className={s.title}>Sign in</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.inputGroup}>
              <input className={cn(s.input, errors.email && s.error )} {...register('email')} placeholder="Email*" autoComplete='on' />
              {errors.email && <p className={s.errorInput}>{errors.email.message}</p>}
            </div>
            <div className={s.inputGroup}>
              <input className={cn(s.input, errors.password && s.error )} {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Password" />
              <button
                type="button"
                className={s.eyeButton}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Icon name={showPassword ? "eye-on" : "eye-off"} width="30" height="30" />
              </button>
              {errors.password && <p className={s.errorInput}>{errors.password.message}</p>}
            </div>
            <button className={s.buttonSubmit} type="submit" disabled={loading}>Sign in</button>
          </form>
          {error && <p className={s.errorForm}>{error}</p>}
          <p className={s.bottomText} onClick={onSwitch}>Don't have an account? Create an account</p>
        </div>
      </div>
    </ModalPortal>
  );
};

export default SignInModal