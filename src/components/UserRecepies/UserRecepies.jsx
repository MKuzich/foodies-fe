import { useSelector } from "react-redux";
import { selectUserRecepies } from "../../redux/users/selectors";
import ListItems from "../ListItems/ListItems";
import {
  currentUserPageErrors,
  userPageErrors,
} from "../../utils/const/userPageErrors";
import { selectIsUserCurrentUser } from "../../redux/users/selectors";

const UserRecepies = () => {
  const userRecepies = useSelector(selectUserRecepies);
  const isUserCurrentUser = useSelector(selectIsUserCurrentUser);

  return (
    <ListItems
      items={userRecepies}
      type="recipe"
      errorText={
        isUserCurrentUser
          ? currentUserPageErrors.noRecipes
          : userPageErrors.noRecipes
      }
    />
  );
};

export default UserRecepies;
