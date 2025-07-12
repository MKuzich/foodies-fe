import styles from './recipeMainInfo.module.css';

const RecipeMainInfo = ({ image, title, category, description, author }) => {
  return (
    <div className={styles.wrapper}>
      <img src={image} alt={title} className={styles.image} />

      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.meta}>
          <span className={styles.category}>{category}</span>
        </div>

        <p className={styles.description}>{description}</p>

        <button className={styles.authorBtn}>
          <img
            src={author.avatar}
            alt={author.name}
            className={styles.avatar}
          />
          Created by: <span className={styles.authorName}>{author.name}</span>
        </button>
      </div>
    </div>
  );
};

export default RecipeMainInfo;
