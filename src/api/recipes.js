import api from "./api";

// export const mockRecipes = [
//     {
//       title: "Bakewell Tart",
//       description: "Traditional Bakewell tart with almond frangipane and raspberry jam.",
//       author: "Linda",
//       image: "/src/assets/tart.png"
//     },
//     {
//       title: "Cinnamon Apple Tarts",
//       description: "Flaky pastry filled with cinnamon spiced apples.",
//       author: "Maria",
//       image: "/src/assets/tart.png"
//     },
//     {
//       title: "Sticky Toffee Pudding",
//       description: "Rich sticky toffee pudding with caramel sauce.",
//       author: "Julie",
//       image: "/src/assets/tart.png"
//     },
//     {
//       title: "Carrot Cake",
//       description: "Moist carrot cake topped with cream cheese frosting.",
//       author: "James",
//       image: "/src/assets/tart.png"
//     },
//     {
//       title: "Eccles Cakes",
//       description: "Classic Eccles cakes with currant filling.",
//       author: "Michelle",
//       image: "/src/assets/tart.png"
//     },
//     {
//       title: "Jaffa Break",
//       description: "Soft sponge cake with orange jelly and chocolate.",
//       author: "Andrew",
//       image: "/src/assets/tart.png"
//     },
//     {
//       title: "Apple Frangipane Tart",
//       description: "Sweet tart with frangipane and sliced apples.",
//       author: "Emma",
//       image: "/src/assets/tart.png"
//     },
//     {
//       title: "Treacle Tart",
//       description: "Traditional British treacle tart with golden syrup.",
//       author: "Sophie",
//       image: "/src/assets/tart.png"
//     },
//     {
//       title: "Peanut Butter Cheesecake",
//       description: "Creamy peanut butter cheesecake with chocolate topping.",
//       author: "Alex",
//       image: "/src/assets/tart.png"
//     },
//     {
//       title: "Rocky Road Fudge",
//       description: "Fudgy rocky road with marshmallows and nuts.",
//       author: "John",
//       image: "/src/assets/tart.png"
//     },
//     {
//       title: "Cashew Ghoria Biscuits",
//       description: "Buttery biscuits with cashew nuts.",
//       author: "Deepika",
//       image: "/src/assets/tart.png"
//     },
//     {
//       title: "Krispy Creme Donut",
//       description: "Classic glazed donuts, soft and sweet.",
//       author: "Sandra",
//       image: "/src/assets/tart.png"
//     }
//   ];


export const getRecipesApi = async (category, page=1, ingredient, area, limit=8) => {
  try {
    const response = await api.get(`recipes`, {
      params: {
        category,
        page,
        limit,
        ingredient,
        area
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};