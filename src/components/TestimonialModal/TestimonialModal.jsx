import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

import api from "../../api";
import Button from "../Button/Button";
import Icon from "../Icon";
import ModalPortal from "../ModalPortal/ModalPortal";
import s from "./TestimonialModal.module.css";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: -50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.9, y: 50 },
};

const schema = yup.object({
  text: yup.string().min(3, "Text must be at least 3 characters").required("Text is required"),
});

const TestimonialModal = ({ onClose, recipeId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const onSubmit = async (data) => {
    data.recipeId = recipeId;
    try {
      setIsLoading(true);
      await api.testimonials.createTestimonial(data);

      window.dispatchEvent(new CustomEvent("testimonial:add"));
      toast.success("Review added successfully");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create review");
      toast.error(error.response?.data?.message || "Failed to create review");
    } finally {
      setIsLoading(false);
      onClose();
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
            <h2 className={s.title}>Add review</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={s.inputGroup}>
                <textarea
                  className={clsx(s.input, errors.text && s.error)}
                  {...register("text")}
                  placeholder="Enter text"
                  autoComplete="off"
                  style={{ resize: "none", minHeight: "200px" }}
                />
                {errors.text && <p className={s.errorInput}>{errors.text.message}</p>}
              </div>
              <Button
                appendClassName={s.buttonSubmit}
                onClick={(e) => e.currentTarget.blur()}
                type="submit"
                disabled={isLoading}
              >
                Create
              </Button>
            </form>
            {error && <p className={s.errorForm}>{error}</p>}
          </motion.div>
        </div>
      </AnimatePresence>
    </ModalPortal>
  );
};

export default TestimonialModal;
