import api from "./api";
const mockCategories = [
    {
        "id": "6462a6cd4c3d0ddd28897f8e",
        "name": "Beef",
        "description": "Indulge in robust, succulent beef creations that elevate classic cuts with deep umami richness and refined culinary technique."
    },
    {
        "id": "6462a6cd4c3d0ddd28897f95",
        "name": "Breakfast",
        "description": "Start your day inspired by our energizing breakfast offerings: wholesome, flavorful dishes designed to awaken the senses and fuel your morning."
    },
    {
        "id": "6462a6cd4c3d0ddd28897f8f",
        "name": "Dessert",
        "description": "Go on a taste journey, where every bite of dessert is an expression of the most refined gastronomic desires, balancing sweetness and artistry."
    },
    {
        "id": "6462a6cd4c3d0ddd28897f8b",
        "name": "Lamb",
        "description": "Experience tender, aromatic lamb dishes that combine traditional recipes with modern flair, inviting you to savor each fragrant mouthful."
    },
    {
        "id": "6462a6cd4c3d0ddd28897f97",
        "name": "Goat",
        "description": "Discover the delicate flavors of goat with dishes that balance earthy richness and bright accents, offering a daring twist on familiar tastes."
    },
    {
        "id": "6462a6cd4c3d0ddd28897f93",
        "name": "Miscellaneous",
        "description": "Explore our curated miscellany of culinary delights—each creation a testament to innovation, surprise, and unexpected flavor pairings."
    },
    {
        "id": "6462a6cd4c3d0ddd28897f94",
        "name": "Pasta",
        "description": "Dive into artisanal pasta masterpieces where every strand is crafted to perfection and bathed in sauces that tell a story of tradition and taste."
    },
    {
        "id": "6462a6cd4c3d0ddd28897f91",
        "name": "Pork",
        "description": "Enjoy succulent pork specialties featuring perfectly rendered fats and bold seasonings, marrying comforting flavors with sophisticated technique."
    },
    {
        "id": "6462a6cd4c3d0ddd28897f8a",
        "name": "Seafood",
        "description": "Savor the ocean’s bounty with exquisitely fresh seafood creations, each plate celebrating coastal flavors and refined culinary craftsmanship."
    },
    {
        "id": "6462a6cd4c3d0ddd28897f96",
        "name": "Side",
        "description": "Complement your main course with thoughtfully crafted sides—vibrant, flavorful accompaniments that elevate every dining experience."
    },
    {
        "id": "6462a6cd4c3d0ddd28897f8c",
        "name": "Starter",
        "description": "Begin your culinary adventure with elegant starters, where each bite teases the palate and sets the stage for gastronomic discovery."
    },
    {
        "id": "6462a6cd4c3d0ddd28897f8d",
        "name": "Chicken",
        "description": "Relish tender, juicy chicken preparations infused with global spices and modern twists, delivering balanced flavor in every dish."
    },
    {
        "id": "6462a6cd4c3d0ddd28897f90",
        "name": "Vegan",
        "description": "Embrace plant-powered excellence through our creative vegan offerings, where bold ingredients and inventive compositions redefine cruelty-free cuisine."
    },
    {
        "id": "6462a6cd4c3d0ddd28897f92",
        "name": "Vegetarian",
        "description": "Savor vibrant vegetarian creations showcasing nature’s bounty, harmoniously blending fresh produce into dishes of unmatched depth and taste."
    },
    {
        "id": "6462a6cd4c3d0ddd28897f98",
        "name": "Soup",
        "description": "Savor comforting soups crafted from seasonal ingredients and rich broths, where every spoonful warms the soul and delights the senses."
    }
]


export const getCategoriesApi = async () => {
    console.log("getCategoriesApi");
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockCategories;
    // const response = await api.get("/categories");
    // return response.data;
};
