import React from "react";
import styles from "./Subtitle.module.css";

const Subtitle = ({ children, maxWidth = "100%" }) => {
  return <h2 className={styles.subtitle} style={{maxWidth}}>{children}</h2>;
};

export default Subtitle;
