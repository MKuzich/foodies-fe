import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./AddRecipeForm.module.css";
import AddRecipeImage from "../AddReceipImage/AddRecipeImage";
import { recipeSchema } from "./validationSchema";

const AddRecipeForm = () => {
  const methods = useForm({
    resolver: yupResolver(recipeSchema),
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log("Form submitted", data);
  };

  return (
    <div className={styles.addRecipeForm}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddRecipeImage />
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddRecipeForm;
