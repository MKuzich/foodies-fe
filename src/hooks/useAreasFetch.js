import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { areasSelector, isLoadingSelector, errorSelector } from "@/redux/areas/selectors";
import { _fetchAreas } from "@/redux/areas/actions";

export const useAreasFetch = () => {
  const dispatch = useDispatch();
  const areas = useSelector(areasSelector);
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);

  useEffect(() => {
    if (areas.length === 0 && !isLoading && !error) {
      dispatch(_fetchAreas());
    }
  }, [dispatch, areas.length, isLoading, error]);

  return { areas, isLoading, error };
};