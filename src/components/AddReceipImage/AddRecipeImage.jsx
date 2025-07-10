import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./AddRecipeImage.module.css";

const AddRecipeImage = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isValidType = ["image/jpeg", "image/jpg", "image/png"].includes(
      file.type
    );
    const isValidSize = file.size <= 10 * 1024 * 1024;

    setValue("photo", file, { shouldValidate: true });

    if (isValidType && isValidSize) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }

    e.target.value = null;
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.photoUpload} ${previewUrl ? styles.filled : ""}`}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview of uploaded recipe image"
            className={styles.preview}
          />
        ) : (
          <label htmlFor="photo-upload" className={styles.labelWrapper}>
            <svg className={styles.icon}>
              <use href="/src/assets/sprite.svg#icon-camera" />
            </svg>
            <span className={styles.uploadText}>Upload a photo</span>
          </label>
        )}

        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          {...register("photo")}
          onChange={handlePhotoChange}
          className={styles.fileInput}
        />
      </div>

      {previewUrl && (
        <label htmlFor="photo-upload" className={styles.reupload}>
          Upload another photo
        </label>
      )}

      {errors?.photo && <p className={styles.error}>{errors.photo.message}</p>}
    </div>
  );
};

export default AddRecipeImage;
