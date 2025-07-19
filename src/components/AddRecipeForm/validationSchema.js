import * as yup from "yup";

export const recipeSchema = yup.object().shape({
  photo: yup
    .mixed()
    .required("Photo is required")
    .test("fileSize", "Max file size is 10MB", (file) => {
      return file && file.size <= 10 * 1024 * 1024;
    })
    .test("fileType", "Unsupported format. Use JPG/PNG.", (file) => {
      return file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type);
    }),

  title: yup.string().required("Title is required"),

  description: yup
    .string()
    .required("Description is required")
    .test("maxWords", "Maximum 200 words", (value) => {
      if (!value) return true;
      return value.trim().split(/\s+/).filter(Boolean).length <= 200;
    }),

  category: yup.number().typeError("Category is required").required("Category is required"),

  area: yup.number().typeError("Area is required").required("Area is required"),

  cookingTime: yup
    .number()
    .typeError("Cooking time is required")
    .min(1, "Minimum cooking time is 1 minute")
    .required("Cooking time is required"),

  recipePreparation: yup
    .string()
    .required("Instructions are required")
    .test("maxWords", "Maximum 200 words", (value) => {
      if (!value) return true;
      return value.trim().split(/\s+/).filter(Boolean).length <= 200;
    }),

  ingredientsList: yup
    .array()
    .min(1, "Add at least one ingredient")
    .of(
      yup.object().shape({
        id: yup.number().required("Ingredient is required"),
        quantity: yup.string().required("Quantity is required"),
      }),
    ),
});
