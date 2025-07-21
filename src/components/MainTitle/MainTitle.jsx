import styles from "./MainTitle.module.css";

function MainTitle({ children, style }) {
  return (
    <h2 className={styles.mainTitle} style={style}>
      {children}
    </h2>
  );
}

export default MainTitle;
