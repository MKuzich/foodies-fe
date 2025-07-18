import MainTitle from "@/components/MainTitle/MainTitle";
import Subtitle from "@/components/Subtitle/Subtitle";

import CategoriesList from "../CategoriesList/CategoriesList";

function Categories() {
  return (
    <div>
      <MainTitle>Categories</MainTitle>
      <Subtitle style={{ maxWidth: "540px" }}>
        Discover a limitless world of culinary possibilities and enjoy exquisite recipes that
        combine taste, style and the warm atmosphere of the kitchen.
      </Subtitle>
      <CategoriesList />
    </div>
  );
}

export default Categories;
