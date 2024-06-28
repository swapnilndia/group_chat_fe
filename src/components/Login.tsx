import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSchema } from "../lib/schema";
import { LoginInfoType } from "../lib/types";
import { loginAction } from "../redux/actions/userAsyncActions";
import { AppDispatch } from "../redux/appStore";

const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const loginHandler = async (data: LoginInfoType) => {
    await dispatch(loginAction(data));
  };
  return (
    <Card
      sx={{
        maxWidth: 750,
        margin: "20px auto auto auto",
        border: "1px solid black",
      }}
    >
      <CardContent>
        <form noValidate onSubmit={handleSubmit(loginHandler)}>
          <Typography variant="h5" align="center">
            Log In
          </Typography>
          <TextField
            margin="normal"
            autoFocus
            required
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            {...register("email")}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            autoFocus
            required
            {...register("password")}
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            helperText={errors.password?.message}
          />{" "}
          <Button variant="contained" type="submit" fullWidth>
            Login
          </Button>
        </form>{" "}
        <br />
        <Button
          variant="contained"
          onClick={() => navigate("/forgot-password")}
          type="button"
          fullWidth
        >
          Forgot Password
        </Button>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="span">Don't have an account?</Typography>
          <Link to={"/signup"}>Sign Up</Link>
        </Box>
      </CardContent>{" "}
    </Card>
  );
};

export default LoginPage;
