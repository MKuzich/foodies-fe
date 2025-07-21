import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import useMediaQuery from "../../hooks/useMediaQuery";
import { userLogout } from "../../redux/auth/actions";
import { setClearFavoriteRecipes } from "../../redux/recipes/slice";
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

const LogoutModal = ({ onClose }) => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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

  const handleKeyClose = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleLogout = async (e) => {
    e.currentTarget.blur();
    const result = await dispatch(userLogout());
    if (userLogout.fulfilled.match(result)) {
      dispatch(setClearFavoriteRecipes());
      toast.success("You have been logged out, we miss you!");
    } else {
      toast.error(result.payload.message || "Failed to log out");
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
            className={clsx(s.modal, s.logoutModal)}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button className={s.close} onClick={onClose}>
              <Icon name="x" />
            </button>
            <h2 className={s.title}>{isMobile ? "Log out" : "Are you logging out?"}</h2>
            <p className={s.bottomText}>You can always log back in at my time.</p>
            <div>
              <Button
                appendClassName={s.buttonSubmit}
                type="button"
                onClick={handleLogout}
                disabled={loading}
              >
                Log out
              </Button>
              <Button
                outlined="true"
                appendClassName={s.buttonCancel}
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
            {error && <p className={s.errorForm}>{error}</p>}
          </motion.div>
        </div>
      </AnimatePresence>
    </ModalPortal>
  );
};

export default LogoutModal;
