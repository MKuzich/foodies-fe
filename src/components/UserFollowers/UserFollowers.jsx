import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserFollowers } from "../../redux/users/operations";
import { selectUserFollowers } from "../../redux/users/selectors";
import ListItems from "../ListItems/ListItems";
import { userPageErrors } from "../../utils/const/userPageErrors";

const UserFollowers = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const errorMap = userPageErrors;
  useEffect(() => {
    dispatch(fetchUserFollowers(id));
  }, [dispatch, id]);
  const followers = useSelector(selectUserFollowers);

  return (
    <ListItems items={followers} type="user" errorText={errorMap.noFollowers} />
  );
};

export default UserFollowers;
