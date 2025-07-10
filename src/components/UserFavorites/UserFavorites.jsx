import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ListItems from "../ListItems/ListItems";
import { selectUserFavorites } from "../../redux/users/selectors";
import {
  currentUserPageErrors,
  userPageErrors,
} from "../../utils/const/userPageErrors";
import { selectIsUserCurrentUser } from "../../redux/users/selectors";
import { fetchUserFavorites } from "../../redux/users/operations";

const UserFavorites = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isUserCurrentUser = useSelector(selectIsUserCurrentUser);

  useEffect(() => {
    if (!isUserCurrentUser) {
      return;
    }
    dispatch(fetchUserFavorites(id));
  }, [dispatch, id, isUserCurrentUser]);

  const userFavorites = useSelector(selectUserFavorites);

  return (
    <ListItems
      items={userFavorites}
      type="recipe"
      errorText={
        isUserCurrentUser
          ? currentUserPageErrors.noFavorites
          : userPageErrors.noFavorites
      }
    />
  );
};

export default UserFavorites;
