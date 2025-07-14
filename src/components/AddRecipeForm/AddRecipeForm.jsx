import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { shallowEqual, useSelector } from "react-redux";

import IconButton from "@/components/IconButton/IconButton";

import { categoriesSelector } from "../../redux/categories/selectors";
import AddRecipeImage from "../AddRecipeImage/AddRecipeImage";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import Icon from "../Icon";
import styles from "./AddRecipeForm.module.css";
import { recipeSchema } from "./validationSchema";

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
      ingredientsList: [],
    },
  });

  const [addedIngredients, setAddedIngredients] = useState([]);

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

  const handleAddIngredient = () => {
    const ingredient = methods.getValues("ingredients");
    const quantity = methods.getValues("quantity");

    if (!ingredient || !quantity) return;

    const exists = addedIngredients.some((item) => item.name === ingredient);
    if (exists) return;

    setAddedIngredients((prev) => {
      const updated = [...prev, { name: ingredient, quantity }];
      methods.setValue("ingredientsList", updated);
      return updated;
    });
    methods.setValue("quantity", "");
  };

  const handleRemoveIngredient = (indexToRemove) => {
    const updated = addedIngredients.filter((_, index) => index !== indexToRemove);
    setAddedIngredients(updated);
    methods.setValue("ingredientsList", updated); // ✅ сохраняем в форму
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
                <p className={styles.error}>{methods.formState.errors.title.message}</p>
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
                <p className={styles.error}>{methods.formState.errors.description.message}</p>
              )}
            </div>

            <div className={clsx(styles.formGroup, styles.formCategoryCookingtime)}>
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

            <div className={clsx(styles.formGroup, styles.formIngredientsQuantity)}>
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
                <p className={styles.error}>{methods.formState.errors.quantity.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.buttonGroup}>
                <Button type="button" outlined="true" onClick={handleAddIngredient}>
                  Add ingredient <Icon name="plus" width={20} height={20} />
                </Button>
              </div>
            </div>

            {addedIngredients.length > 0 && (
              <div className={styles.formGroup}>
                <div className={styles.ingredientList}>
                  {addedIngredients.map((item, index) => (
                    <div key={index} className={styles.ingredientCard}>
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => handleRemoveIngredient(index)}
                      >
                        &times;
                      </button>

                      <img src={item.url} alt={item.name} className={styles.ingredientImage} />
                      <span className={styles.ingredientName}>{item.name}</span>
                      <span className={styles.ingredientQty}>{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                <p className={styles.error}>{methods.formState.errors.recipePreparation.message}</p>
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
