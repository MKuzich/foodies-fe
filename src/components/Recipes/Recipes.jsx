import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import MainTitle from "@/components/MainTitle/MainTitle";
import Pagination from "@/components/Pagination/Pagination";
import Subtitle from "@/components/Subtitle/Subtitle";
import { useAuth } from "@/hooks/useAuth";
import useMediaQuery from "@/hooks/useMediaQuery";
import { selectCategoryByName } from "@/redux/categories/selectors";
import { showAllRecipesSelector } from "@/redux/recipes/selectors";
import { extractParamsFromUrl } from "@/utils/extractParamsFromUrl";

import { getRecipesApi } from "../../api/recipes";
import Icons from "../../assets/sprite.svg";
import Meta from "../Meta/Meta";
import RecipeFilters from "../RecipeFilters/RecipeFilters";
import RecipeList from "../RecipeList/RecipeList";
import styles from "./Recipes.module.css";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: null,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const recipesRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 374px)");
  const limitPage = isMobile ? 8 : 12;

  const [searchParams, setSearchParams] = useSearchParams();

  const shouldShowAll = useSelector(showAllRecipesSelector);

  useEffect(() => {
    if (!isLoading && recipesRef.current) {
      recipesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pagination.page, isLoading]);

  const getRecipes = async () => {
    setIsLoading(true);
    const params = extractParamsFromUrl(searchParams);
    try {
      const recipes = await getRecipesApi({ ...params, limit: limitPage });
      setRecipes(recipes.data);
      setPagination(recipes.pagination);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecipes();
  }, [searchParams, user]);

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
      // TODO: REMOVE THIS AFTER TESTING IT WAS USED BEFORE BUT I THINK IT IS NOT NEEDED
      // getRecipesApi({ ...params, limit: limitPage });
      setSearchParams(params);
    }
  };

  const category = useSelector(selectCategoryByName(searchParams.get("category")));

  const CategoryDescription =
    category && !shouldShowAll
      ? category.description
      : "A comprehensive collection of meal categories including appetizers, main courses, side dishes, desserts, beverages, and more. Each section offers diverse options to suit any preference or dietary need.";
  const CategoryName = category && !shouldShowAll ? category.name : "All recipes";

  return (
    <>
      <Meta title={CategoryName} description={CategoryDescription} />
      <div className={styles.recipesContainer} ref={recipesRef}>
        <button className={styles.recipesBackButton} onClick={handleBack}>
          <svg className={styles.recipesBackIcon}>
            <use href={`${Icons}#icon-arrow-left`} />
          </svg>
          <p className={styles.recipesBackText}>Back</p>
        </button>
        <MainTitle>{CategoryName}</MainTitle>
        <Subtitle style={{ maxWidth: "540px" }}>{CategoryDescription}</Subtitle>
        <div className={styles.recipesContent}>
          <RecipeFilters />
          <div>
            <div>
              <RecipeList recipes={recipes} isLoading={isLoading} error={error} />
              {pagination.pages > 1 && (
                <div className={styles.paginationWrapper}>
                  <Pagination
                    currentPage={Number(pagination.page)}
                    totalPages={Number(pagination.pages)}
                    onClick={handlePaginationClick}
                    borders={true}
                    style={{ marginTop: "0" }}
                  />
                </div>
              )}
              {/* TODO: REMOVE THIS AFTER TESTING */}
              {/* <RecipePagination currentPage={Number(pagination.page)} lastPage={Number(pagination.pages)} onClick={handlePaginationClick} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipes;
