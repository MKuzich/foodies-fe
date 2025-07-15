import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeMainInfo from '../../components/RecipeMainInfo/RecipeMainInfo';
import RecipeIngredients from '../../components/RecipeIngredients/RecipeIngredients';
// import RecipePreparation from '../components/RecipePreparation';

import styles from './recipePage.module.css';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        const data = await response.json();
        console.log('hdhdhdhj', data);
        setRecipe(data);
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // const handleToggleFavorite = async () => {
  //   if (!recipe) return;

  //   const url = `/api/recipes/${id}/favorite`;

  //   try {
  //     await fetch(url, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ favorite: !recipe.isFavorite }),
  //     });

  //     setRecipe({ ...recipe, isFavorite: !recipe.isFavorite });
  //   } catch (error) {
  //     console.error('Error updating favorite status', error);
  //   }
  // };

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found</div>;

  const {
    title,
    category: { name: categoryName } = {},
    time,
    thumb,
    description,
    owner: author,
    ingredients,
  } = recipe;

  return (
    <div className={styles.recipeInfo}>
      {/* <RecipeMainInfo
        image={recipe.image}
        title={recipe.title}
        category={recipe.category}
        description={recipe.description}
        author={recipe.author}
      />

      <RecipeIngredients ingredients={recipe.ingredients} />

      <RecipePreparation
        description={recipe.instructions}
        isFavorite={recipe.isFavorite}
        onToggleFavorite={handleToggleFavorite}
      /> */}
    </div>
  );
};

export default RecipePage;
