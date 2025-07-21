import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import IconButton from "@/components/IconButton/IconButton";
import { useCategoriesAreasIngredientsFetch } from "@/hooks/useCategoriesAreasIngredientsFetch";
import { fetchRecipeThunk } from "@/redux/addRecipe/actions";
import {
  selectAddRecipeError,
  selectAddRecipeLoading,
  selectAddRecipeSuccess,
  selectCreatedRecipeId,
} from "@/redux/addRecipe/selectors";
import { clearError, clearSuccess } from "@/redux/addRecipe/slice";
import { areasSelector } from "@/redux/areas/selectors";
import { categoriesSelector } from "@/redux/categories/selectors";
import { ingredientsSelector } from "@/redux/ingredients/selectors";

import { autoResize } from "../../utils/autoResizeTextarea";
import { disableScroll, enableScroll } from "../../utils/helpers";
import AddRecipeImage from "../AddRecipeImage/AddRecipeImage";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import DropdownSearch from "../DropdownSearch/DropdownSearch";
import Icon from "../Icon";
import Loader from "../Loader/Loader";
import styles from "./AddRecipeForm.module.css";
import { recipeSchema } from "./validationSchema";

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recipeCreated = useSelector(selectAddRecipeSuccess);
  const createdRecipeId = useSelector(selectCreatedRecipeId);
  const recipeError = useSelector(selectAddRecipeError);
  const loading = useSelector(selectAddRecipeLoading);

  useCategoriesAreasIngredientsFetch();

  useEffect(() => {
    if (recipeError) {
      toast.error(recipeError);
      dispatch(clearError());
      return;
    }

    if (recipeCreated && createdRecipeId) {
      toast.success("Recipe successfully created!");
      dispatch(clearSuccess());
      setResetSignal((prev) => !prev);
      navigate(`/recipe/${createdRecipeId}`);
    }
  }, [recipeCreated, createdRecipeId, recipeError, dispatch, navigate]);

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

  const areas = useSelector(areasSelector);
  const ingredients = useSelector(ingredientsSelector);
  const categories = useSelector(categoriesSelector);

  const stepTime = 5;
  const maxTime = 999;
  const currentTime = watch("cookingTime") || stepTime;
  const increase = () => {
    if (currentTime < maxTime) setValue("cookingTime", currentTime + stepTime);
  };
  const decrease = () => {
    if (currentTime > stepTime) setValue("cookingTime", currentTime - stepTime);
  };

  const maxWords = 200;
  const countWords = (str) => str.trim().split(/\s+/).filter(Boolean).length;
  const limitWordsInput = (e) => {
    const words = e.target.value.trim().split(/\s+/);
    if (words.length > maxWords) {
      e.target.value = words.slice(0, maxWords).join(" ");
    }
  };

  const description = watch("description") || "";
  const recipePreparation = watch("recipePreparation") || "";

  const descriptionRef = useRef(null);
  const recipePreparationRef = useRef(null);

  const [resetSignal, setResetSignal] = useState(false);

  useEffect(() => {
    autoResize(descriptionRef, true);
    autoResize(recipePreparationRef, true);
  }, [resetSignal]);

  useEffect(() => {
    loading ? disableScroll() : enableScroll();
  }, [loading]);

  const buildFormData = (data) => {
    const formData = new FormData();

    formData.append("thumb", data.photo);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("instructions", data.recipePreparation);
    formData.append("categoryId", data.category);
    formData.append("areaId", data.area);
    formData.append("time", data.cookingTime);

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
        quantity: "",
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
    dispatch(fetchRecipeThunk(formData));
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
    if (exists) {
      methods.setValue("ingredients", null);
      methods.setValue("quantity", "");
      return toast.error("This ingredient is already in the list!");
    }

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
    methods.setValue("ingredients", null);
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
      {loading && (
        <div className={styles.loaderWrapper}>
          <Loader isDark={false} large />
        </div>
      )}
      <FormProvider {...methods}>
        <form className={clsx(styles.formAdd)} onSubmit={handleSubmit(onSubmit)}>
          <AddRecipeImage resetSignal={resetSignal} />

          <div className={clsx(styles.fieldsGroup)}>
            <div className={clsx(styles.formGroup)}>
              <input
                id="title"
                className={clsx(
                  styles.titleInput,
                  methods.formState.errors.title && styles.inputError,
                )}
                name="title"
                type="text"
                placeholder="The name of the recipe"
                {...methods.register("title")}
              />
              {methods.formState.errors.title && (
                <span className={styles.error}>{methods.formState.errors.title.message}</span>
              )}
            </div>

            <div className={clsx(styles.formGroup, styles.formDescription)}>
              <div
                className={clsx(
                  styles.descriptionWrapper,
                  methods.formState.errors.description && styles.inputError,
                )}
              >
                <Controller
                  name="description"
                  control={methods.control}
                  render={({ field }) => (
                    <textarea
                      ref={(el) => {
                        descriptionRef.current = el;
                        field.ref(el);
                      }}
                      value={field.value}
                      onChange={(e) => {
                        limitWordsInput(e);
                        field.onChange(e);
                        autoResize(descriptionRef);
                      }}
                      className={clsx(styles.description)}
                      placeholder="Enter a description of the dish"
                    />
                  )}
                />
                {methods.formState.errors.description && (
                  <span className={styles.error}>
                    {methods.formState.errors.description.message}
                  </span>
                )}
                <span className={styles.wordsCounterInside}>
                  <span
                    className={clsx({
                      [styles.wordsCounterActive]: countWords(description) > 0,
                    })}
                  >
                    {countWords(description)}
                  </span>
                  /{maxWords}
                </span>
              </div>
            </div>

            <div className={clsx(styles.formGroup, styles.formCategoryCookingtime)}>
              <div className={styles.formCategory}>
                <span className={clsx(styles.category)}>Category</span>
                <Controller
                  name="category"
                  control={methods.control}
                  render={({ field }) => (
                    <Dropdown
                      placeholder="Select a category"
                      data={categories}
                      value={field.value}
                      onChange={field.onChange}
                      resetSignal={resetSignal}
                      hasError={!!methods.formState.errors.category}
                      errorMessage={methods.formState.errors.category?.message}
                      className={styles.dropdown}
                    />
                  )}
                />
              </div>

              <div className={clsx(styles.formCookingtime)}>
                <span className={clsx(styles.cookingtime)}>COOKING TIME</span>
                <div className={clsx(styles.buttonGroup)}>
                  <IconButton
                    type="button"
                    name="minus"
                    onClick={decrease}
                    disabled={currentTime <= stepTime}
                    className={clsx(styles.minusButton)}
                    iconClass={clsx(styles.minusIcon)}
                  />
                  <span
                    className={clsx(
                      styles.timeInput,
                      String(currentTime).length >= 3 && styles.adjustIndent,
                    )}
                  >
                    {currentTime} min
                  </span>
                  <IconButton
                    type="button"
                    name="plus"
                    onClick={increase}
                    disabled={currentTime >= maxTime}
                    className={clsx(styles.plusButton)}
                    iconClass={clsx(styles.plusIcon)}
                  />
                </div>
              </div>
            </div>

            <div className={clsx(styles.formGroup, styles.formGroupArea)}>
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
                      resetSignal={resetSignal}
                      hasError={!!methods.formState.errors.area}
                      errorMessage={methods.formState.errors.area?.message}
                      className={styles.dropdown}
                    />
                  )}
                />
              </div>
            </div>

            <div className={clsx(styles.formGroup, styles.formIngredientsQuantity)}>
              <div className={clsx(styles.formIngredients)}>
                <span className={clsx(styles.ingredients)}>Ingredients</span>
                <Controller
                  name="ingredients"
                  control={methods.control}
                  render={({ field }) => (
                    <DropdownSearch
                      name="ingredients"
                      placeholder="Add the ingredient"
                      data={ingredients}
                      value={field.value}
                      onChange={field.onChange}
                      resetSignal={resetSignal}
                      hasError={!!methods.formState.errors.ingredients}
                      errorMessage={methods.formState.errors.ingredients?.message}
                      className={styles.dropdownSearch}
                    />
                  )}
                />
              </div>

              <div
                className={clsx(
                  styles.formQuantity,
                  methods.formState.errors.quantity && styles.inputError,
                )}
              >
                <input
                  id="quantity"
                  className={clsx(styles.quantity)}
                  name="quantity"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter quantity"
                  {...methods.register("quantity")}
                />
                {methods.formState.errors.quantity && (
                  <span className={clsx(styles.error)}>
                    {methods.formState.errors.quantity.message}
                  </span>
                )}
              </div>
            </div>

            <div className={clsx(styles.formGroup)}>
              <div className={clsx(styles.buttonGroup)}>
                <Button
                  type="button"
                  outlined="true"
                  onClick={handleAddIngredient}
                  appendClassName={clsx(styles.btnIngredient)}
                >
                  Add ingredient <Icon name="plus" className={clsx(styles.iconPlus)} />
                </Button>
              </div>
            </div>

            {addedIngredients.length > 0 ? (
              <div className={clsx(styles.formGroup)}>
                <div className={clsx(styles.ingredientList)}>
                  {addedIngredients.map((item, index) => (
                    <div key={index} className={clsx(styles.ingredientCard)}>
                      <button
                        type="button"
                        className={clsx(styles.removeButton)}
                        onClick={() => handleRemoveIngredient(index)}
                      >
                        <Icon name="x" width={16} height={16} />
                      </button>
                      <div className={clsx(styles.ingredientImageWrapper)}>
                        <img
                          loading="lazy"
                          src={item.preview}
                          alt={item.name}
                          className={clsx(styles.ingredientImage)}
                          data-tooltip-id="added-ingredient-tooltip"
                          data-tooltip-content={`${item.name} - ${item.quantity}`}
                          onError={(e) => {
                            e.target.src = "/noImg.webp";
                            e.target.srcSet = "/noImg.webp 1x, /noImg@2x.webp 2x";
                            e.target.onerror = null;
                          }}
                        />
                      </div>
                      <div className={clsx(styles.ingredientDetails)}>
                        <span className={clsx(styles.ingredientName)}>{item.name}</span>
                        <span className={clsx(styles.ingredientQty)}>{item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              methods.formState.errors.ingredientsList?.message && (
                <div className={clsx(styles.formGroup)}>
                  <span className={clsx(styles.error)}>
                    {methods.formState.errors.ingredientsList.message}
                  </span>
                </div>
              )
            )}

            <div className={clsx(styles.formGroup, styles.formRecipePreparation)}>
              {methods.formState.errors.recipePreparation && (
                <span className={clsx(styles.error)}>
                  {methods.formState.errors.recipePreparation.message}
                </span>
              )}
              <span className={clsx(styles.titleRecipePreparation)}>Recipe Preparation</span>
              <div
                className={clsx(
                  styles.textareaWrapper,
                  methods.formState.errors.title && styles.inputError,
                )}
              >
                <Controller
                  name="recipePreparation"
                  control={methods.control}
                  render={({ field }) => (
                    <textarea
                      ref={(el) => {
                        recipePreparationRef.current = el;
                        field.ref(el);
                      }}
                      value={field.value}
                      onChange={(e) => {
                        limitWordsInput(e);
                        field.onChange(e);
                        autoResize(recipePreparationRef);
                      }}
                      className={clsx(styles.recipePreparation)}
                      placeholder="Enter recipe"
                    />
                  )}
                />
                <span className={clsx(styles.wordsCounterInside)}>
                  <span
                    className={clsx({
                      [styles.wordsCounterActive]: countWords(recipePreparation) > 0,
                    })}
                  >
                    {countWords(recipePreparation)}
                  </span>
                  /{maxWords}
                </span>
              </div>
            </div>
            <div className={clsx(styles.formGroup, styles.formGroupSubmit)}>
              <div className={clsx(styles.buttonGroup)}>
                <IconButton
                  type="button"
                  name="trash"
                  className={clsx(styles.trashButton)}
                  iconClass={clsx(styles.trashIcon)}
                  onClick={handleReset}
                />
                <Button type="submit" disabled={loading} appendClassName={clsx(styles.btnSubmit)}>
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
      <Tooltip
        id="added-ingredient-tooltip"
        border="1px solid var(--title-color)"
        color="var(--text-color)"
        place="top"
        effect="solid"
        delayHide={500}
        clickable={true}
        style={{
          backgroundColor: "var(--white-color)",
          color: "var(--title-color)",
          borderRadius: "30px",
          padding: "8px 12px",
          fontSize: "14px",
        }}
      />
    </div>
  );
};

export default AddRecipeForm;
