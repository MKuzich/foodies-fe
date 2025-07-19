import { useDispatch, useSelector } from "react-redux";

import { deleteTestimonial } from "../../redux/users/operations";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import IconButton from "../IconButton/IconButton";
import s from "./RecipeTestimonials.module.css";

export default function RecipeTestimonials({ testimonials, onDelete }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.userInfo);

  const handleDelete = async (id) => {
    const result = await dispatch(deleteTestimonial(id));
    if (result.type.includes("fulfilled")) onDelete(id);
  };
  return (
    <div className={s.recipeTestimonials}>
      <h2 className={s.title}>Our users say</h2>
      <ul>
        {testimonials.length > 0 &&
          testimonials.map((item) => {
            const currentUserIsOwner = item.user.id === currentUser.id;

            return (
              <li key={item.id} className={s.testimonialItem}>
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
                    onClick={() => handleDelete(item.id)}
                  />
                )}
              </li>
            );
          })}

        {!testimonials.length && <li>No reviews is available for this recipe.</li>}
      </ul>
    </div>
  );
}
