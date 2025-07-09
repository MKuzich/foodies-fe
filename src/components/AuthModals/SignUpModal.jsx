import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/auth/authActions';
import { ModalPortal } from '../ModalPortal/ModalPortal';

const SignUpModal = ({ onClose, onSwitch }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const onSubmit = (data) => dispatch(registerUser(data));

  return (
    <ModalPortal>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="close" onClick={onClose}>✕</button>
          <h2>SIGN UP</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name')} placeholder="Name" required />
            <input {...register('email')} placeholder="Email" required />
            <input {...register('password')} type="password" placeholder="Password" required />
            <button type="submit" disabled={loading}>CREATE</button>
          </form>
          {error && <p className="error">{error}</p>}
          <p>I already have an account? <span onClick={onSwitch}>Sign in</span></p>
        </div>
      </div>
    </ModalPortal>
  );
};

export default SignUpModal