import RecipeFilters from "../RecipeFilters/RecipeFilters";
import RecipeList from "../RecipeList/RecipeList";
import styles from "./Recipes.module.css";
import MainTitle from "@/components/MainTitle/MainTitle";
import Subtitle from "@/components/Subtitle/Subtitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Icons from "../../assets/sprite.svg";
// import RecipePagination from "../RecipePagination/RecipePagination";
import Pagination from "@/components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import { isLoadingSelector, paginationSelector, recipesSelector } from "@/redux/recipes/selectors";
import { fetchRecipes } from "@/redux/recipes/actions";
import useMediaQuery from "@/hooks/useMediaQuery";
import { selectCategoryByName } from "../../redux/categories/selectors";
import { querySelector } from "@/redux/recipes/selectors";
import { compareTwoObjectsShallow } from "@/utils/compareTwoObjects";
import { setQuery } from "@/redux/recipes/slice";
import { extractParamsFromUrl } from "@/utils/extractParamsFromUrl";


function Recipes() {
    const pagination = useSelector(paginationSelector);
    const isLoading = useSelector(isLoadingSelector);
    const query = useSelector(querySelector);
    const recipes = useSelector(recipesSelector); 

    const recipesRef = useRef(null);

    const isMobile = useMediaQuery("(max-width: 375px)");
    const limitPage = isMobile ? 8 : 12;


    const [searchParams, setSearchParams] = useSearchParams();
    const [skipNextEffect, setSkipNextEffect] = useState(false);


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
        if (skipNextEffect) {
            setSkipNextEffect(false);
            return; // Пропускаем выполнение
        }

        const params = extractParamsFromUrl(searchParams);

        console.log("params in useEffect", params);
        console.log("query in useEffect", query);
        const areEqual = compareTwoObjectsShallow(params, query);
        console.log("areEqual", areEqual);



        // THIS NEED TO BE WHEN WE HAVE SEARCH PARAMS AND QUERY EQUAL OR WE HAVE EMPTY RECIPES AND WHAT TO GET BACK TO THE PREV PAGE 
        const shouldFetch = !areEqual || recipes.length === 0;
        if (shouldFetch) {
            dispatch(fetchRecipes({ ...params, limit: limitPage }));
        }
        //THIS NEED TO BE WHEN WE LEAVE PAGE BY ID OR SOMEHOW ELSE 
        return () => {
            dispatch(setQuery(params));
        };


        // TODO: ADD DEPENDENCIES RECIPES FOR THIS USE EFFECT
    }, [dispatch, searchParams, limitPage]);

    

    const handleBack = () => {
        const params = extractParamsFromUrl(searchParams);

        dispatch(setQuery(params));
        setSkipNextEffect(true);
        setSearchParams({});
    };

    const handlePaginationClick = (page) => {

        if (page <= pagination.pages) {
            const params = {};
            if (searchParams.get('category')) params.category = searchParams.get('category');
            if (searchParams.get('ingredient')) params.ingredient = searchParams.get('ingredient');
            if (searchParams.get('area')) params.area = searchParams.get('area');
            params.page = page;

            dispatch(fetchRecipes({ ...params, limit: limitPage }));
            dispatch(setQuery(params));
            setSearchParams(params);
        }
    };

    const category = useSelector(selectCategoryByName(searchParams.get('category')));

    const CategoryDescription = category ? category.description : 'A comprehensive collection of meal categories including appetizers, main courses, side dishes, desserts, beverages, and more. Each section offers diverse options to suit any preference or dietary need.';
    const CategoryName = category ? category.name : 'All recipes';
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
                    <div >
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