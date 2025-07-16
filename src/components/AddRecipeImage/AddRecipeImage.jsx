import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import Icons from "@/assets/sprite.svg";

import styles from "./AddRecipeImage.module.css";

const AddRecipeImage = ({ resetSignal }) => {
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const [previewUrl, setPreviewUrl] = useState(null);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    register("photo");
  }, [register]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    setPreviewUrl(null);
    setLocalError(null);
    setValue("photo", null, { shouldValidate: false });
  }, [resetSignal, setValue]);

  const onDropAccepted = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setValue("photo", file, { shouldValidate: true });
      setPreviewUrl(URL.createObjectURL(file));
      setLocalError(null);
    },
    [setValue],
  );

  const onDropRejected = useCallback(
    (fileRejections) => {
      const reason = fileRejections[0]?.errors[0]?.message;
      setPreviewUrl(null);
      setLocalError(reason || "Invalid file");
      setValue("photo", null, { shouldValidate: true });
    },
    [setValue],
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
          <img src={previewUrl} alt="Preview" className={styles.preview} />
        ) : (
          <div className={styles.labelWrapper}>
            <svg className={styles.icon}>
              <use href={`${Icons}#icon-framed-camera`} />
            </svg>
            <span className={styles.uploadText}>Upload a photo</span>
          </div>
        )}
        <input {...getInputProps()} id="photo-upload" className={styles.fileInput} />
        {localError && <span className={styles.error}>{localError}</span>}
        {errors?.photo && <span className={styles.error}>{errors.photo.message}</span>}
      </div>

      {previewUrl && (
        <label htmlFor="photo-upload" className={styles.reupload}>
          Upload another photo
        </label>
      )}
    </div>
  );
};

export default AddRecipeImage;
