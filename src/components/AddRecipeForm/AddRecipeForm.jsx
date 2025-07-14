import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { shallowEqual, useSelector } from "react-redux";

import IconButton from "@/components/IconButton/IconButton";
import { useAreasFetch } from "@/hooks/useAreasFetch";
import { useIngredientsFetch } from "@/hooks/useIngredientsFetch";

import { categoriesSelector } from "../../redux/categories/selectors";
import AddRecipeImage from "../AddRecipeImage/AddRecipeImage";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import Icon from "../Icon";
import styles from "./AddRecipeForm.module.css";
import { recipeSchema } from "./validationSchema";

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
  const { ingredients } = useIngredientsFetch();
  const { areas } = useAreasFetch();

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
    const {
      quantity: _quantity,
      ingredientsList,
      category,
      area,
      cookingTime,
      recipePreparation,
      ...rest
    } = data;

    const formattedIngredients = ingredientsList.map(({ id, quantity }) => ({
      id,
      measure: quantity,
    }));

    const payload = {
      ...rest,
      categoryId: category,
      areaId: area,
      title: data.title,
      description: data.description,
      instructions: recipePreparation,
      time: `${cookingTime} min`,
      ingredients: formattedIngredients,
      // + добавим photo, если используем FormData
    };

    console.log("Payload ready to send:", payload);
  };

  const handleAddIngredient = () => {
    const selectedId = methods.getValues("ingredients");
    const quantity = methods.getValues("quantity");

    const selectedIngredient = ingredients.find((item) => item.id === selectedId);

    if (!selectedIngredient || !quantity) return;

    const exists = addedIngredients.some((item) => item.id === selectedIngredient.id);
    if (exists) return;

    const newEntry = {
      id: selectedIngredient.id,
      name: selectedIngredient.name,
      preview: selectedIngredient.img,
      quantity,
    };

    setAddedIngredients((prev) => {
      const updated = [...prev, newEntry];
      methods.setValue("ingredientsList", updated);
      return updated;
    });

    methods.setValue("quantity", "");
  };

  const handleRemoveIngredient = (indexToRemove) => {
    const updated = addedIngredients.filter((_, index) => index !== indexToRemove);
    setAddedIngredients(updated);
    methods.setValue("ingredientsList", updated);
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

            <div className={styles.formGroup}>
              <div className={styles.formArea}>
                <span className={styles.area}>Area</span>
                <Controller
                  name="area"
                  control={methods.control}
                  render={({ field }) => (
                    <Dropdown
                      placeholder="Area"
                      data={areas}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
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
                      data={ingredients}
                      value={field.value}
                      onChange={field.onChange}
                      valueKey="id"
                      labelKey="name"
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
                        <Icon name="x" width={16} height={16} />
                      </button>
                      <img src={item.preview} alt={item.name} className={styles.ingredientImage} />
                      <div className={styles.ingredientDetails}>
                        <span className={styles.ingredientName}>{item.name}</span>
                        <span className={styles.ingredientQty}>{item.quantity}</span>
                      </div>
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
