import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/auth/authActions';
import { ModalPortal } from '../ModalPortal/ModalPortal';

const SignInModal = ({ onClose, onSwitch }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const onSubmit = (data) => dispatch(userLogin(data));

  return (
    <ModalPortal>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="close" onClick={onClose}>✕</button>
          <h2>SIGN IN</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email')} placeholder="Email" required />
            <input {...register('password')} type="password" placeholder="Password" required />
            <button type="submit" disabled={loading}>SIGN IN</button>
          </form>
          {error && <p className="error">{error}</p>}
          <p>Don't have an account? <span onClick={onSwitch}>Create an account</span></p>
        </div>
      </div>
    </ModalPortal>
  );
};

export default SignInModal