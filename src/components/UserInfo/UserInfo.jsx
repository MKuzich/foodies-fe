import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/users/selectors";
import { selectLoading } from "../../redux/root/selectors";

const UserInfo = () => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);

  return <div>UserInfo</div>;
};

export default UserInfo;
