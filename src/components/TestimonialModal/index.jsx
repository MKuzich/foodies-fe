import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { openSignIn, selectCurrentUser } from "../../redux/auth/slice";
import Button from "../Button/Button";
import ModalPortal from "../ModalPortal/ModalPortal";
import TestimonialModal from "./TestimonialModal";

const OpenModalButton = ({ recipeId, onChangeTestimonials }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector(selectCurrentUser);

  const handleOpen = () => {
    if (!isLoggedIn) {
      dispatch(openSignIn());
      return;
    }
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button outlined onClick={handleOpen}>
        Add testimonial
      </Button>

      {isOpen && (
        <ModalPortal>
          <TestimonialModal
            onClose={handleClose}
            recipeId={recipeId}
            onChangeTestimonials={onChangeTestimonials}
          />
        </ModalPortal>
      )}
    </>
  );
};

export default OpenModalButton;
