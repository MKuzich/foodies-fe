import React from "react";
import styles from "./AddRecipeForm.module.css";

const AddRecipeForm = () => {
  return (
    <div className={styles.addRecipeForm}>
      <div className={styles.photoUpload}>
        <span className={styles.uploadText}>Upload a photo</span>
      </div>
    </div>
  );
};

export default AddRecipeForm;
