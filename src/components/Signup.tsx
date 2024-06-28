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
import { signupSchema } from "../lib/schema";
import { SignupInfoType } from "../lib/types";
import { UserService } from "../redux/services/userService";

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    resolver: yupResolver(signupSchema),
  });

  const signupHandler = async (data: SignupInfoType) => {
    const { name, email, phone, password } = data;
    const response = await UserService.userSignup({
      name,
      email,
      phone,
      password,
    });
    if (response && response.status === 201) {
      navigate("/login");
      reset();
    }
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
        <form noValidate onSubmit={handleSubmit(signupHandler)}>
          <Typography variant="h5" align="center">
            Sign up
          </Typography>
          <TextField
            autoFocus
            required
            margin="normal"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            {...register("name")}
            helperText={errors?.name?.message}
          />
          <TextField
            autoFocus
            required
            margin="normal"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            {...register("email")}
            helperText={errors?.email?.message}
          />
          <TextField
            autoFocus
            required
            margin="normal"
            label="Mobile"
            type="text"
            fullWidth
            variant="outlined"
            {...register("phone")}
            helperText={errors?.email?.message}
          />
          <TextField
            autoFocus
            required
            multiline
            margin="normal"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            {...register("password")}
            helperText={errors?.password?.message}
          />{" "}
          <Button variant="contained" type="submit" fullWidth>
            Create an Account
          </Button>
        </form>{" "}
        <br />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="span">Already have an account?</Typography>
          <Link to={"/login"}>Log In</Link>
        </Box>
      </CardContent>{" "}
    </Card>
  );
};

export default SignupPage;
