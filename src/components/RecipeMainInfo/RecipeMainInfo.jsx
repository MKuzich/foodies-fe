import styles from './RecipeMainInfo.module.css';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';

const RecipeMainInfo = ({
  image,
  title,
  category,
  time,
  description,
  author,
  ingredients,
}) => {
  return (
    <div className={styles.wrapper}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.meta}>
            <span className={styles.category}>{category}</span>
            <span className={styles.category}>{time}</span>
          </div>

          <p className={styles.description}>{description}</p>

          <button className={styles.authorBtn}>
            <img
              src={author.avatarURL}
              alt={author.name}
              className={styles.avatar}
            />
            <div className={styles.authorInfo}>
              Created by:{' '}
              <span className={styles.authorName}>{author.name}</span>
            </div>
          </button>
        </div>
        <h3 className={styles.itemTitle}>Ingredients</h3>
        <RecipeIngredients ingredients={ingredients} />
      </div>
    </div>
  );
};

export default RecipeMainInfo;
