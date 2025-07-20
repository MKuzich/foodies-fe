export const extractParamsFromUrl = (searchParams) => {
  const params = {};
  if (searchParams.get("category")) params.category = searchParams.get("category");
  params.page = searchParams.get("page") || 1;
  if (searchParams.get("ingredient"))
    params.ingredient = decodeURIComponent(searchParams.get("ingredient"));
  if (searchParams.get("area")) params.area = decodeURIComponent(searchParams.get("area"));
  return params;
};
