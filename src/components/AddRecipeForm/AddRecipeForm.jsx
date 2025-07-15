import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import IconButton from "@/components/IconButton/IconButton";
import { useAreasFetch } from "@/hooks/useAreasFetch";
import { useIngredientsFetch } from "@/hooks/useIngredientsFetch";
import { submitRecipeThunk } from "@/redux/addRecipe/actions";
import { selectAddRecipeSuccess } from "@/redux/addRecipe/selectors";
import { clearSuccess } from "@/redux/addRecipe/slice";

import { categoriesSelector } from "../../redux/categories/selectors";
import AddRecipeImage from "../AddRecipeImage/AddRecipeImage";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import Icon from "../Icon";
import styles from "./AddRecipeForm.module.css";
import { recipeSchema } from "./validationSchema";

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipeCreated = useSelector(selectAddRecipeSuccess);

  useEffect(() => {
    if (recipeCreated) {
      toast.success("Recipe successfully created!");
      dispatch(clearSuccess());
      navigate("/recipes");
    }
  }, [recipeCreated, dispatch]);

  const methods = useForm({
    resolver: yupResolver(recipeSchema),
    mode: "onChange",
    defaultValues: {
      cookingTime: 5,
      ingredientsList: [],
    },
  });

  const [addedIngredients, setAddedIngredients] = useState([]);

  const { handleSubmit, watch, setValue } = methods;

  const categories = useSelector(categoriesSelector, shallowEqual);
  const { ingredients } = useIngredientsFetch();
  const { areas } = useAreasFetch();
  const [resetSignal, setResetSignal] = useState(false);

  const maxLength = 200;
  const stepTime = 5;
  const currentTime = watch("cookingTime") || stepTime;
  const increase = () => setValue("cookingTime", currentTime + stepTime);
  const decrease = () => {
    if (currentTime > stepTime) setValue("cookingTime", currentTime - stepTime);
  };

  const description = watch("description") || "";
  const recipePreparation = watch("recipePreparation") || "";

  const buildFormData = (data) => {
    const formData = new FormData();

    formData.append("thumb", data.photo);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("instructions", data.recipePreparation);
    formData.append("categoryId", data.category);
    formData.append("areaId", data.area);
    formData.append("time", `${data.cookingTime} min`);

    const formattedIngredients = data.ingredientsList.map(({ id, quantity }) => ({
      id,
      measure: quantity,
    }));

    formData.append("ingredients", JSON.stringify(formattedIngredients));

    return formData;
  };

  const handleReset = () => {
    methods.reset(
      {
        photo: null,
        title: "",
        description: "",
        category: null,
        area: null,
        cookingTime: 5,
        ingredientsList: [],
        recipePreparation: "",
      },
      {
        keepDefaultValues: true,
      },
    );
    setAddedIngredients([]);
    methods.clearErrors("photo");
    setResetSignal((prev) => !prev);
  };

  const onSubmit = async (data) => {
    const formData = buildFormData(data);
    dispatch(submitRecipeThunk(formData));
  };

  const handleAddIngredient = () => {
    const selectedId = methods.getValues("ingredients");
    const quantity = methods.getValues("quantity");

    const selectedIngredient = ingredients.find((item) => item.id === selectedId);

    methods.clearErrors("quantity");

    if (!selectedIngredient) {
      methods.setError("ingredients", {
        type: "manual",
        message: "Choose an ingredient",
      });
      return;
    }

    if (!quantity || quantity.trim() === "") {
      methods.setError("quantity", {
        type: "manual",
        message: "Quantity is required",
      });
      return;
    }

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
    methods.clearErrors(["ingredients", "quantity"]);
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
          <AddRecipeImage resetSignal={resetSignal} />

          <div className={styles.fieldsGroup}>
            <div className={styles.formGroup}>
              {methods.formState.errors.title && (
                <span className={styles.error}>{methods.formState.errors.title.message}</span>
              )}
              <input
                id="title"
                className={styles.titleInput}
                name="title"
                type="text"
                placeholder="The name of the recipe"
                {...methods.register("title")}
              />
            </div>

            <div className={styles.formGroup}>
              {methods.formState.errors.description && (
                <span className={styles.error}>{methods.formState.errors.description.message}</span>
              )}
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
            </div>

            <div className={clsx(styles.formGroup, styles.formCategoryCookingtime)}>
              <div className={styles.formCategory}>
                {methods.formState.errors.category && (
                  <span className={styles.error}>{methods.formState.errors.category.message}</span>
                )}
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
                {methods.formState.errors.cookingTime && (
                  <span className={styles.error}>
                    {methods.formState.errors.cookingTime.message}
                  </span>
                )}
                <span className={styles.cookingtime}>COOKING TIME</span>
                <div className={styles.buttonGroup}>
                  <IconButton
                    type="button"
                    name="minus"
                    onClick={decrease}
                    disabled={currentTime <= stepTime}
                  />
                  <input
                    name="cookingTime"
                    type="number"
                    autoComplete="off"
                    className={styles.timeInput}
                    {...methods.register("cookingTime", { valueAsNumber: true })}
                  />
                  <IconButton type="button" name="plus" onClick={increase} />
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.formArea}>
                {methods.formState.errors.area && (
                  <span className={styles.error}>{methods.formState.errors.area.message}</span>
                )}
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
                {methods.formState.errors.ingredients && (
                  <span className={styles.error}>
                    {methods.formState.errors.ingredients.message}
                  </span>
                )}
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
                {methods.formState.errors.quantity && (
                  <span className={styles.error}>{methods.formState.errors.quantity.message}</span>
                )}
                <input
                  id="quantity"
                  className={styles.quantity}
                  name="quantity"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter quantity"
                  {...methods.register("quantity")}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.buttonGroup}>
                <Button type="button" outlined="true" onClick={handleAddIngredient}>
                  Add ingredient <Icon name="plus" width={20} height={20} />
                </Button>
              </div>
            </div>

            <div className={styles.formGroup}>
              {addedIngredients.length > 0 && (
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
              )}
              {methods.formState.errors.ingredientsList && (
                <span className={styles.error}>
                  {methods.formState.errors.ingredientsList.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              {methods.formState.errors.recipePreparation && (
                <span className={styles.error}>
                  {methods.formState.errors.recipePreparation.message}
                </span>
              )}
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
            </div>
            <div className={styles.formGroup}>
              <div className={styles.buttonGroup}>
                <IconButton type="button" name="trash" onClick={handleReset} />
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
