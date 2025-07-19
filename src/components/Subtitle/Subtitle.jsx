import React from "react";

import styles from "./Subtitle.module.css";

const Subtitle = ({ children, style }) => {
  return (
    <h3 className={styles.subtitle} style={style}>
      {children}
    </h3>
  );
};

export default Subtitle;
