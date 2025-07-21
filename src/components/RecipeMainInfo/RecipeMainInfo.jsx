import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AvatarIcon from "../../components/AvatarIcon/AvatarIcon";
import RecipeIngredients from "../../components/RecipeIngredients/RecipeIngredients";
import RecipePreparation from "../../components/RecipePreparation/RecipePreparation";
import { openSignIn, selectCurrentUser } from "../../redux/auth/slice";
import styles from "./RecipeMainInfo.module.css";

const RecipeMainInfo = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectCurrentUser);

  const authorId = recipe.owner.id;

  const handleAuthorClick = (e) => {
    e.currentTarget.blur();

    if (!isLoggedIn) {
      dispatch(openSignIn());
    } else {
      navigate(`/user/${authorId}`);
    }
  };
  const { owner: author } = recipe;
  const formattedTime = recipe.time.includes("min") ? recipe.time : `${recipe.time} min`;
  return (
    <div className={styles.wrapper}>
      <img src={recipe.thumb} alt={recipe.title} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <h3 className={styles.title}>{recipe.title}</h3>
          <div className={styles.meta}>
            <span className={styles.category}>{recipe.category}</span>
            <span className={styles.category}>{formattedTime}</span>
          </div>

          <p className={styles.description}>{recipe.description}</p>

          <button className={styles.authorBtn} onClick={handleAuthorClick}>
            <AvatarIcon
              name={author.name}
              src={author.avatarURL}
              alt={`${author.name} avatar`}
              small
              to={`/user/${author.id}`}
            />

            <div className={styles.authorInfo}>
              Created by: <span className={styles.authorName}>{author.name}</span>
            </div>
          </button>
        </div>
        <RecipeIngredients ingredients={recipe.ingredients} />
        <RecipePreparation recipe={recipe} />
      </div>
    </div>
  );
};

export default RecipeMainInfo;
