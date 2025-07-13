import RecipeFilters from "../RecipeFilters/RecipeFilters";
import RecipeList from "../RecipeList/RecipeList";
import styles from "./Recipes.module.css";
import MainTitle from "@/components/MainTitle/MainTitle";
import Subtitle from "@/components/Subtitle/Subtitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import Icons from "../../assets/sprite.svg";
import RecipePagination from "../RecipePagination/RecipePagination";
import { useSearchParams } from "react-router-dom";
import { errorSelector, isLoadingSelector, paginationSelector } from "@/redux/recipes/selectors";
import { fetchRecipes } from "@/redux/recipes/actions";
import Loader from "../Loader/Loader";
import useMediaQuery from "@/hooks/useMediaQuery";


function Recipes() {
    const pagination = useSelector(paginationSelector);
    const isLoading = useSelector(isLoadingSelector);
    const error = useSelector(errorSelector);


    const recipesRef = useRef(null);

    const isMobile = useMediaQuery("(max-width: 375px)");
    const limitPage = isMobile ? 8 : 12;


    const [searchParams, setSearchParams] = useSearchParams();


    const dispatch = useDispatch();


    // TODO: MAYBE SHOUDL COMBINE THIS LOGIC TO ONE USE EFFECT
    useEffect(() => {
        if (recipesRef.current) {
            recipesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    useEffect(() => {
        if (!isLoading && recipesRef.current) {
            recipesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [pagination.page, isLoading]);


    useEffect(() => {
        console.log("caalling useEffect");
        const params = {};
        if (searchParams.get('category')) params.category = searchParams.get('category');
        params.page = searchParams.get('page') || 1;
        if (searchParams.get('ingredient')) params.ingredient = searchParams.get('ingredient');
        if (searchParams.get('area')) params.area = searchParams.get('area');
        

        dispatch(fetchRecipes({ ...params, limit: limitPage }));
      }, [dispatch, searchParams, limitPage]);


    const handleBack = () => {
        setSearchParams({});
    }

    const handlePaginationClick = (page) => {
        if (page <= pagination.pages) {
          const params = {};
          if (searchParams.get('category')) params.category = searchParams.get('category');
          if (searchParams.get('ingredient')) params.ingredient = searchParams.get('ingredient');
          if (searchParams.get('area')) params.area = searchParams.get('area');
          params.page = page;
      
          dispatch(fetchRecipes({ ...params, limit: limitPage }));
          setSearchParams(params);
        }
      };

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
            <MainTitle>{searchParams.get('category') ? searchParams.get('category') : 'All recipes'}</MainTitle>
            <Subtitle style={{ maxWidth: "540px" }}>Description</Subtitle>
            <div className={styles.recipesContent}>
                <RecipeFilters />
                <div>
                    {isLoading && <Loader />}
                    {error && <div>Error: {error}</div>}
                    {!isLoading && !error && (
                        <div >
                            <RecipeList />
                            <RecipePagination currentPage={Number(pagination.page)} lastPage={Number(pagination.pages)} onClick={handlePaginationClick} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Recipes;