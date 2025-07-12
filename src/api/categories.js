import api from "./api";
const mockCategories = [
  {
    id: "6462a6cd4c3d0ddd28897f8e",
    name: "Beef",
  },
  {
    id: "6462a6cd4c3d0ddd28897f95",
    name: "Breakfast",
  },
  {
    id: "6462a6cd4c3d0ddd28897f8f",
    name: "Dessert",
  },
  {
    id: "6462a6cd4c3d0ddd28897f8b",
    name: "Lamb",
  },
  {
    id: "6462a6cd4c3d0ddd28897f97",
    name: "Goat",
  },
  {
    id: "6462a6cd4c3d0ddd28897f93",
    name: "Miscellaneous",
  },
  {
    id: "6462a6cd4c3d0ddd28897f94",
    name: "Pasta",
  },
  {
    id: "6462a6cd4c3d0ddd28897f91",
    name: "Pork",
  },
  {
    id: "6462a6cd4c3d0ddd28897f8a",
    name: "Seafood",
  },

  {
    id: "6462a6cd4c3d0ddd28897f96",
    name: "Side",
  },
  {
    id: "6462a6cd4c3d0ddd28897f8c",
    name: "Starter",
  },
  {
    id: "6462a6cd4c3d0ddd28897f8d",
    name: "Chicken",
  },

  {
    id: "6462a6cd4c3d0ddd28897f90",
    name: "Vegan",
  },

  {
    id: "6462a6cd4c3d0ddd28897f92",
    name: "Vegetarian",
  },
];
export const getCategoriesApi = async () => {
  console.log("getCategoriesApi");
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return mockCategories;
  // const response = await api.get("/categories");
  // return response.data;
};
