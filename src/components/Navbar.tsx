import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInStatus } from "../redux/reducers/userSlice";
import { Link } from "react-router-dom";
import { AppDispatch } from "../redux/appStore";
import { logoutAction } from "../redux/actions/userAsyncActions";
import { Icon } from "@iconify-icon/react";

export default function Navbar() {
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector(selectLoggedInStatus);

  const handleLogout = async () => {
    console.log("first");
    dispatch(logoutAction());
  };

  return (
    <Box width="100%">
      <AppBar sx={{ backgroundColor: "#25D366" }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Icon icon="cib:whatsapp" width="48" height="48" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WhatsApp
          </Typography>
          {isLoggedIn ? (
            <Button
              onClick={() => handleLogout()}
              variant="outlined"
              color="inherit"
            >
              Logout
            </Button>
          ) : (
            <Button variant="outlined" color="inherit">
              <Link to="/login"> Login</Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
