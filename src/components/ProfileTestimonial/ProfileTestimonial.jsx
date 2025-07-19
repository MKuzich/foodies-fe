import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { deleteTestimonial } from "../../redux/users/operations";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import Icon from "../Icon";
import IconButton from "../IconButton/IconButton";
import s from "./ProfileTestimonial.module.css";

export default function TestimonialItem({ data }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);

  const handleDelete = async () => {
    setIsDeleting(true);

    const result = await dispatch(deleteTestimonial(data.id));
    if (deleteTestimonial.fulfilled.match(result)) {
      toast.success("Successfully deleted testimonial!");
    } else {
      toast.error(result.payload.message || "Failed to delete testimonial");
    }
    setIsDeleting(false);
  };
  return (
    <li className={s.testimonialItem}>
      <div className={s.recipeWrapper}>
        <AvatarIcon
          name={data.recipe.title}
          src={data.recipe.thumb}
          alt={`${data.recipe.title} avatar`}
          small
          to={`/recipe/${data.recipe.id}`}
        />
      </div>
      <div className={s.testimonialContent}>
        <h3 className={s.recipeName}>{data.recipe.title}</h3>
        <div className={s.testimonialWrapper}>
          <Icon name="comment" className={s.commentIcon} />
          <div className={s.authorInfo}>
            <h3 className={s.authorName}>{user.name}</h3>
            <span className={s.date}>{new Date(data.updatedAt).toLocaleString()}</span>
          </div>
          <p>{data.testimonial}</p>
          <IconButton
            disabled={isDeleting}
            className={s.buttonDelete}
            name="trash"
            onClick={handleDelete}
          />
        </div>
      </div>
    </li>
  );
}
