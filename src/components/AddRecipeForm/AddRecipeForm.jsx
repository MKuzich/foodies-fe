import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./AddRecipeForm.module.css";
import AddRecipeImage from "../AddRecipeImage/AddRecipeImage";
import { recipeSchema } from "./validationSchema";
import Button from "../Button/Button";
import IconButton from "@/components/IconButton/IconButton";
import Dropdown from "../Dropdown/Dropdown";

const mockIngredients = [
  { id: 1, name: "Eggs" },
  { id: 2, name: "Flour" },
  { id: 3, name: "Sugar" },
  { id: 4, name: "Butter" },
  { id: 5, name: "Milk" },
  { id: 6, name: "Salt" },
  { id: 7, name: "Baking Powder" },
  { id: 8, name: "Vanilla Extract" },
  { id: 9, name: "Chocolate" },
  { id: 10, name: "Strawberries" },
];

const AddRecipeForm = () => {
  const methods = useForm({
    resolver: yupResolver(recipeSchema),
    mode: "onChange",
    defaultValues: {
      cookingTime: 10,
    },
  });

  const { handleSubmit, watch, setValue } = methods;

  const currentTime = watch("cookingTime") || 5;
  const increase = () => setValue("cookingTime", currentTime + 5);
  const decrease = () => {
    if (currentTime > 1) setValue("cookingTime", currentTime - 5);
  };

  const onSubmit = (data) => {
    console.log("Form submitted", data);
  };

  return (
    <div className={styles.addRecipeForm}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddRecipeImage />
          <div className={styles.formGroup}>
            <input
              id="title"
              className={styles.titleInput}
              name="title"
              type="text"
              placeholder="The name of the recipe"
              {...methods.register("title")}
            />
            {methods.formState.errors.title && (
              <p className={styles.error}>
                {methods.formState.errors.title.message}
              </p>
            )}

            <input
              id="description"
              className={styles.descriptionInput}
              name="description"
              type="text"
              placeholder="Enter a description of the dish"
              {...methods.register("description")}
            />
            {methods.formState.errors.description && (
              <p className={styles.error}>
                {methods.formState.errors.description.message}
              </p>
            )}

            <span className={styles.cookingtime}>COOKING TIME</span>
            <div className={styles.buttonGroup}>
              <IconButton type="button" name="minus" onClick={decrease} />
              <span className={styles.timeDisplay}>{currentTime} min</span>
              <IconButton type="button" name="plus" onClick={increase} />
            </div>

            <span className={styles.ingredients}>Ingredients</span>
            <Dropdown
              placeholder="Add the ingredient"
              data={mockIngredients}
              name="ingredients"
              {...methods.register("ingredients")}
            />

            <div className={styles.buttonGroup}>
              <IconButton type="button" name="trash" disabled />
              <Button type="submit">Publish</Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddRecipeForm;
