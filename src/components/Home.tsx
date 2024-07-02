import { Grid, Paper } from "@mui/material";
import Contact from "./Contact";
import { useState } from "react";
import GroupDetailComponent from "./GroupDetailComponent";

const Home = () => {
  const [group, setGroup] = useState<string>("IND");

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
            <h1>Individual component</h1>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Home;
