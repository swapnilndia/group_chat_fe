import * as yup from "yup";

export const signupSchema = yup.object({
  name: yup.string().required().min(2),
  email: yup.string().required().email(),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  password: yup.string().required(),
});

export const loginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});
