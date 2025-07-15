import { useState } from "react";

import Button from "../Button/Button";
import { ModalPortal } from "../ModalPortal/ModalPortal";
import TestimonialModal from "./TestimonialModal";

const OpenModalButton = ({ recipeId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button outlined onClick={handleOpen}>
        Add testimonial
      </Button>

      {isOpen && (
        <ModalPortal>
          <TestimonialModal onClose={handleClose} recipeId={recipeId} />
        </ModalPortal>
      )}
    </>
  );
};

export default OpenModalButton;
