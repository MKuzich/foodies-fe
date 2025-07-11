import React, { useState, useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./AddRecipeImage.module.css";
import { useDropzone } from "react-dropzone";

const AddRecipeImage = () => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const [previewUrl, setPreviewUrl] = useState(null);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onDropAccepted = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setValue("photo", file, { shouldValidate: true });
      setPreviewUrl(URL.createObjectURL(file));
      setLocalError(null);
    },
    [setValue]
  );

  const onDropRejected = useCallback(
    (fileRejections) => {
      const reason = fileRejections[0]?.errors[0]?.message;
      setPreviewUrl(null);
      setLocalError(reason || "Invalid file");
      setValue("photo", null, { shouldValidate: true });
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    multiple: false,
    maxSize: 10 * 1024 * 1024,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
  });

  return (
    <div className={styles.wrapper}>
      <div
        {...getRootProps()}
        className={`${styles.photoUpload} ${previewUrl ? styles.filled : ""} ${
          isDragActive ? styles.dragActive : ""
        }`}
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
          {...getInputProps()}
          id="photo-upload"
          className={styles.fileInput}
        />
      </div>

      {previewUrl && (
        <label htmlFor="photo-upload" className={styles.reupload}>
          Upload another photo
        </label>
      )}
      {localError && <p className={styles.error}>{localError}</p>}
      {errors?.photo && <p className={styles.error}>{errors.photo.message}</p>}
    </div>
  );
};

export default AddRecipeImage;
