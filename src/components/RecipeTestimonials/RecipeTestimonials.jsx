import AvatarIcon from "../AvatarIcon/AvatarIcon";
import s from "./RecipeTestimonials.module.css";

export default function RecipeTestimonials({ testimonials }) {
  return (
    <div className={s.recipeTestimonials}>
      <div className={s.divider} />
      <h2 className={s.title}>Recipe Testimonials</h2>
      <ul>
        {testimonials.length > 0 &&
          testimonials.map((item) => (
            <li key={item.id} className={s.testimonialItem}>
              <div className={s.avatarWrapper}>
                <AvatarIcon
                  name={item.user.name}
                  avatarUrl={item.user.avatarUrl}
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
            </li>
          ))}
        {!testimonials.length && <li>No testimonials available for this recipe.</li>}
      </ul>
    </div>
  );
}
