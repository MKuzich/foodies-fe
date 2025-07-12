import * as yup from "yup";

export const recipeSchema = yup.object().shape({
  photo: yup
    .mixed()
    .required("Photo is required")
    .test("fileSize", "Max file size is 10MB", (file) => {
      return file && file.size <= 10 * 1024 * 1024;
    })
    .test("fileType", "Unsupported format. Use JPG/PNG.", (file) => {
      return (
        file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
      );
    }),
});
