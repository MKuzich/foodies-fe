import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import MainTitle from "@/components/MainTitle/MainTitle";
// import RecipePagination from "../RecipePagination/RecipePagination";
import Pagination from "@/components/Pagination/Pagination";
import Subtitle from "@/components/Subtitle/Subtitle";
import useMediaQuery from "@/hooks/useMediaQuery";
import { fetchRecipes } from "@/redux/recipes/actions";
import { isLoadingSelector, paginationSelector } from "@/redux/recipes/selectors";

import Icons from "../../assets/sprite.svg";
import { selectCategoryByName } from "../../redux/categories/selectors";
import RecipeFilters from "../RecipeFilters/RecipeFilters";
import RecipeList from "../RecipeList/RecipeList";
import styles from "./Recipes.module.css";

function Recipes() {
  const pagination = useSelector(paginationSelector);
  const isLoading = useSelector(isLoadingSelector);

  const recipesRef = useRef(null);

  const isMobile = useMediaQuery("(max-width: 374px)");
  const limitPage = isMobile ? 8 : 12;

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  // TODO: MAYBE SHOUDL COMBINE THIS LOGIC TO ONE USE EFFECT
  useEffect(() => {
    if (recipesRef.current) {
      recipesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (!isLoading && recipesRef.current) {
      recipesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pagination.page, isLoading]);

  useEffect(() => {
    const params = {};
    if (searchParams.get("category")) params.category = searchParams.get("category");
    params.page = searchParams.get("page") || 1;
    if (searchParams.get("ingredient"))
      params.ingredient = decodeURIComponent(searchParams.get("ingredient"));
    if (searchParams.get("area")) params.area = decodeURIComponent(searchParams.get("area"));
    dispatch(fetchRecipes({ ...params, limit: limitPage }));
  }, [dispatch, searchParams, limitPage]);

  const handleBack = () => {
    setSearchParams({});
  };

  const handlePaginationClick = (page) => {
    if (page <= pagination.pages) {
      const params = {};
      if (searchParams.get("category")) params.category = searchParams.get("category");
      if (searchParams.get("ingredient")) params.ingredient = searchParams.get("ingredient");
      if (searchParams.get("area")) params.area = searchParams.get("area");
      params.page = page;

      dispatch(fetchRecipes({ ...params, limit: limitPage }));
      setSearchParams(params);
    }
  };

  const category = useSelector(selectCategoryByName(searchParams.get("category")));

  const CategoryDescription = category
    ? category.description
    : "A comprehensive collection of meal categories including appetizers, main courses, side dishes, desserts, beverages, and more. Each section offers diverse options to suit any preference or dietary need.";
  const CategoryName = category ? category.name : "All recipes";
  return (
    <div className={styles.recipesContainer} ref={recipesRef}>
      <div className={styles.recipesBackContainer} onClick={handleBack}>
        <button className={styles.recipesBackButton}>
          <svg className={styles.recipesBackIcon}>
            <use href={`${Icons}#icon-arrow-left`} />
          </svg>
          <p className={styles.recipesBackText}>Back</p>
        </button>
      </div>
      <MainTitle>{CategoryName}</MainTitle>
      <Subtitle style={{ maxWidth: "540px" }}>{CategoryDescription}</Subtitle>
      <div className={styles.recipesContent}>
        <RecipeFilters />
        <div>
          <div>
            <RecipeList />
            {pagination.pages > 1 && (
              <Pagination
                currentPage={Number(pagination.page)}
                totalPages={Number(pagination.pages)}
                onClick={handlePaginationClick}
                borders={true}
                style={{ marginTop: "0" }}
              />
            )}
            {/* TODO: REMOVE THIS AFTER TESTING */}
            {/* <RecipePagination currentPage={Number(pagination.page)} lastPage={Number(pagination.pages)} onClick={handlePaginationClick} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recipes;
