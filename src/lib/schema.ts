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

export const createGroupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Group name is required")
    .min(3, "Group name must be at least 3 characters long")
    .max(50, "Group name must be at most 50 characters long")
    .matches(
      /^[a-zA-Z0-9 ]*$/,
      "Group name can only contain letters, numbers, and spaces"
    ),
});
export const renameGroupSchema = yup.object().shape({
  newGroupName: yup
    .string()
    .required("Group name is required")
    .min(3, "Group name must be at least 3 characters long")
    .max(50, "Group name must be at most 50 characters long")
    .matches(
      /^[a-zA-Z0-9 ]*$/,
      "Group name can only contain letters, numbers, and spaces"
    ),
});

export const addUserToGroupSchema = yup.object().shape({
  email: yup.string().email("Must be a valid email"),
  phone: yup.string().when("email", {
    is: (email: string | undefined) => !email || email.length === 0,
    then: (schema) => schema.required("atleast one field is required"),
    otherwise: (schema) => schema.optional(),
  }),
});

export const sendMessageSchema = yup.object().shape({
  text: yup
    .string()
    .required("Group name is required")
    .min(1, "Group name must be at least 1 characters long"),
});
