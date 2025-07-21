import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { userLogin } from "../../redux/auth/actions";
import { selectNext } from "../../redux/auth/slice";
import { disableScroll, enableScroll } from "../../utils/helpers";
import Button from "../Button/Button";
import Icon from "../Icon";
import ModalPortal from "../ModalPortal/ModalPortal";
import s from "./index.module.css";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: -50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.9, y: 50 },
};

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignInModal = ({ onClose, onSwitch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const next = useSelector(selectNext);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    disableScroll();
    return () => {
      window.removeEventListener("keydown", handleEsc);
      enableScroll();
    };
  }, [onClose]);

  const onSubmit = async (data) => {
    const result = await dispatch(userLogin(data));
    if (userLogin.fulfilled.match(result)) {
      if (next) {
        navigate(next);
      }
      toast.success("You have been logged in, welcome back!");
    } else {
      toast.error(result.payload.message || "Failed to log in");
    }
  };

  const handleKeyClose = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <ModalPortal>
      <AnimatePresence>
        <div
          className={s.modalBackdrop}
          onMouseDown={onClose}
          onKeyDown={handleKeyClose}
          tabIndex="0"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={s.modal}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button className={s.close} onClick={onClose}>
              <Icon name="x" />
            </button>
            <h2 className={s.title}>Sign in</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={s.inputGroup}>
                <input
                  className={clsx(s.input, errors.email && s.error)}
                  {...register("email")}
                  placeholder="Email*"
                  autoComplete="on"
                />
                {errors.email && <p className={s.errorInput}>{errors.email.message}</p>}
              </div>
              <div className={s.inputGroup}>
                <input
                  className={clsx(s.input, errors.password && s.error)}
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="on"
                />
                <button
                  type="button"
                  className={s.eyeButton}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <Icon name={showPassword ? "eye-on" : "eye-off"} width="30" height="30" />
                </button>
                {errors.password && <p className={s.errorInput}>{errors.password.message}</p>}
              </div>
              <Button
                appendClassName={s.buttonSubmit}
                onClick={(e) => e.currentTarget.blur()}
                type="submit"
                disabled={loading}
              >
                Sign in
              </Button>
            </form>
            {error && <p className={s.errorForm}>{error}</p>}
            <p className={s.bottomText}>
              Don't have an account?{" "}
              <span className={s.bottomTextLink} onClick={onSwitch}>
                Create an account
              </span>
            </p>
          </motion.div>
        </div>
      </AnimatePresence>
    </ModalPortal>
  );
};

export default SignInModal;
