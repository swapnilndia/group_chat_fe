import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInfoAction } from "../redux/actions/userAsyncActions";
import {
  selectLoggedInStatus,
  selectUserInfo,
} from "../redux/reducers/userSlice";
import { AppDispatch } from "../redux/appStore";

const Home = () => {
  const loggedInStatus = useSelector(selectLoggedInStatus);
  const userInfo = useSelector(selectUserInfo);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (loggedInStatus === true) {
      dispatch(userInfoAction());
    }
  }, [loggedInStatus]);

  return (
    <>
      {loggedInStatus ? <h1>True</h1> : <h1>False</h1>}
      {userInfo ? <h1>welcome back, {userInfo?.name}</h1> : <h1>Loading...</h1>}
    </>
  );
};

export default Home;
