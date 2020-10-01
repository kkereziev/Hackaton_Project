import * as yup from "yup";

export const LoginValidationSchema = yup.object({
  username: yup
    .string()
    .min(5, "Your username should be at least 4 characters long.")
    .required("This field is required."),
  password: yup
    .string()
    .min(6, "Your password should be at least 6 characters long.")
    .required("This field is required."),
});
