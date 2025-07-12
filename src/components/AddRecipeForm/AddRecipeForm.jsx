import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./AddRecipeForm.module.css";
import AddRecipeImage from "../AddRecipeImage/AddRecipeImage";
import { recipeSchema } from "./validationSchema";
import Button from "../Button/Button";
import IconButton from "@/components/IconButton/IconButton";
import Dropdown from "../Dropdown/Dropdown";
import { shallowEqual, useSelector } from "react-redux";
import { categoriesSelector } from "../../redux/categories/selectors";
import Icon from "../Icon";
import clsx from "clsx";

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

  const categories = useSelector(categoriesSelector, shallowEqual);

  const maxLength = 200;
  const stepTime = 5;
  const currentTime = watch("cookingTime") || stepTime;
  const increase = () => setValue("cookingTime", currentTime + stepTime);
  const decrease = () => {
    if (currentTime > stepTime) setValue("cookingTime", currentTime - stepTime);
  };

  const description = watch("description") || "";
  const recipePreparation = watch("recipePreparation") || "";

  const onSubmit = (data) => {
    console.log("Form submitted", data);
  };

  return (
    <div className={styles.addRecipeForm}>
      <FormProvider {...methods}>
        <form className={styles.formAdd} onSubmit={handleSubmit(onSubmit)}>
          <AddRecipeImage />

          <div className={styles.fieldsGroup}>
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
            </div>

            <div className={styles.formGroup}>
              <div className={styles.textareaWrapper}>
                <textarea
                  id="description"
                  className={styles.description}
                  name="description"
                  type="text"
                  placeholder="Enter a description of the dish"
                  maxLength={maxLength}
                  {...methods.register("description")}
                />
                <span className={styles.charCounterInside}>
                  {description.length}/{maxLength}
                </span>
              </div>
              {methods.formState.errors.description && (
                <p className={styles.error}>
                  {methods.formState.errors.description.message}
                </p>
              )}
            </div>

            <div
              className={clsx(styles.formGroup, styles.formCategoryCookingtime)}
            >
              <div className={styles.formCategory}>
                <span className={styles.category}>Category</span>
                <Controller
                  name="category"
                  control={methods.control}
                  render={({ field }) => (
                    <Dropdown
                      placeholder="Select a category"
                      data={categories}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className={styles.formCookingtime}>
                <span className={styles.cookingtime}>COOKING TIME</span>
                <div className={styles.buttonGroup}>
                  <IconButton
                    type="button"
                    name="minus"
                    onClick={decrease}
                    disabled={currentTime <= stepTime}
                  />
                  <span className={styles.timeDisplay}>{currentTime} min</span>
                  <IconButton type="button" name="plus" onClick={increase} />
                </div>
              </div>
            </div>

            <div
              className={clsx(styles.formGroup, styles.formIngredientsQuantity)}
            >
              <div className={styles.formIngredients}>
                <span className={styles.ingredients}>Ingredients</span>
                <Controller
                  name="ingredients"
                  control={methods.control}
                  render={({ field }) => (
                    <Dropdown
                      placeholder="Add the ingredient"
                      data={mockIngredients}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className={styles.formQuantity}>
                <input
                  id="quantity"
                  className={styles.quantity}
                  name="quantity"
                  type="text"
                  placeholder="Enter quantity"
                  {...methods.register("quantity")}
                />
              </div>
              {methods.formState.errors.quantity && (
                <p className={styles.error}>
                  {methods.formState.errors.quantity.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.buttonGroup}>
                <Button
                  type="button"
                  outlined="true"
                  onClick={() => {
                    console.log("Add ingredient clicked");
                  }}
                >
                  Add ingredient <Icon name="plus" width={20} height={20} />
                </Button>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.textareaWrapper}>
                <textarea
                  id="recipePreparation"
                  className={styles.recipePreparation}
                  name="recipePreparation"
                  type="text"
                  placeholder="Enter recipe"
                  maxLength={maxLength}
                  {...methods.register("recipePreparation")}
                />
                <span className={styles.charCounterInside}>
                  {recipePreparation.length}/{maxLength}
                </span>
              </div>
              {methods.formState.errors.recipePreparation && (
                <p className={styles.error}>
                  {methods.formState.errors.recipePreparation.message}
                </p>
              )}
            </div>
            <div className={styles.formGroup}>
              <div className={styles.buttonGroup}>
                <IconButton type="button" name="trash" disabled />
                <Button type="submit">Publish</Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddRecipeForm;
