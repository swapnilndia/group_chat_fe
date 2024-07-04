import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../redux/reducers/userSlice";
import { AppDispatch } from "../redux/appStore";
import { userInfoAction } from "../redux/actions/userAsyncActions";
import { Grid, Paper } from "@mui/material";
import Contact from "./Contact";
import GroupDetailComponent from "./GroupDetailComponent";
import IndividualComponent from "./IndividualComponent";
import IndividualDetailComponent from "./IndividualDetailComponent";

const defaultChat = {
  chatType: "IND",
};
const chatType = JSON.parse(
  localStorage.getItem("chatType") || JSON.stringify(defaultChat)
);

const Home = () => {
  const [group, setGroup] = useState<string>(chatType);
  const dispatch: AppDispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (userInfo === null) {
      dispatch(userInfoAction());
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatType", JSON.stringify(group));
  }, [group]);

  return (
    <Paper>
      <Grid container>
        <Grid item xs={5} sm={4} md={3} lg={2}>
          <Contact group={group} setGroup={setGroup} />
        </Grid>
        <Grid item xs={7} sm={8} md={9} lg={10}>
          {group === "GRP" ? (
            <GroupDetailComponent />
          ) : (
            <IndividualDetailComponent />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Home;
