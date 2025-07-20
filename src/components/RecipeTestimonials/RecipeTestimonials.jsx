import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { deleteTestimonial } from "../../redux/users/operations";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import IconButton from "../IconButton/IconButton";
import s from "./RecipeTestimonials.module.css";

export default function RecipeTestimonials({ testimonials, onDelete }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.userInfo);

  const handleDelete = async (e, id) => {
    const btn = e.currentTarget;
    btn.disabled = true;
    await toast.promise(dispatch(deleteTestimonial(id)), {
      loading: "Deleting review...",
      success: (result) => {
        if (deleteTestimonial.fulfilled.match(result)) {
          onDelete(id);
          return "Successfully deleted review!";
        }
        throw new Error("Failed to remove review");
      },
      error: (err) => err.message,
    });
    btn.disabled = false;
  };

  return (
    <div className={s.recipeTestimonials}>
      <h2 className={s.title}>Our users say</h2>
      <ul className={s.testimonialsList}>
        <AnimatePresence>
          {testimonials.length > 0 &&
            testimonials.map((item) => {
              const currentUserIsOwner = currentUser ? item.user.id === currentUser.id : false;

              return (
                <motion.li
                  key={item.id}
                  className={s.testimonialItem}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={s.avatarWrapper}>
                    <AvatarIcon
                      name={item.user.name}
                      src={item.user.avatarURL}
                      alt={`${item.user.name} avatar`}
                      small
                      to={`/user/${item.user.id}`}
                    />
                  </div>
                  <div>
                    <div className={s.authorInfo}>
                      <h3 className={s.authorName}>{item.user.name}</h3>
                      <span className={s.date}>{new Date(item.updatedAt).toLocaleString()}</span>
                    </div>
                    <p>{item.testimonial}</p>
                  </div>
                  {currentUserIsOwner && (
                    <IconButton
                      className={s.buttonDelete}
                      name="trash"
                      onClick={(e) => handleDelete(e, item.id)}
                    />
                  )}
                </motion.li>
              );
            })}
        </AnimatePresence>

        {!testimonials.length && <li>No reviews are available for this recipe.</li>}
      </ul>
    </div>
  );
}
