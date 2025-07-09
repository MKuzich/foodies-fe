import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import ListItems from "../ListItems/ListItems";
import { selectUserFollowing } from "../../redux/users/selectors";
import {
  currentUserPageErrors,
  userPageErrors,
} from "../../utils/const/userPageErrors";
import { selectIsUserCurrentUser } from "../../redux/users/selectors";
import { fetchUserFollowing } from "../../redux/users/operations";

const UserFollowing = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isUserCurrentUser = useSelector(selectIsUserCurrentUser);

  useEffect(() => {
    if (!isUserCurrentUser) {
      return;
    }
    dispatch(fetchUserFollowing(id));
  }, [dispatch, id, isUserCurrentUser]);

  const userFollowing = useSelector(selectUserFollowing);

  return (
    <ListItems
      items={userFollowing}
      type="user"
      errorText={
        isUserCurrentUser
          ? currentUserPageErrors.noSubscriptions
          : userPageErrors.noSubscriptions
      }
    />
  );
};

export default UserFollowing;
