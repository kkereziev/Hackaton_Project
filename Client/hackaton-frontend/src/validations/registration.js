import * as yup from "yup";

export const RegistrationValidationSchema = yup.object({
  username: yup
    .string()
    .min(5, "Your username should be at least 5 characters long.")
    .matches(
      /^(?!.*\.(?:com|net))[A-Z0-9.]{5,}$/i,
      "Your username can contain only '.' and alphanumeric characters."
    )
    .required("This field is required."),
  password: yup
    .string()
    .min(6, "Your password should be at least 6 characters long.")
    .required("This field is required."),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match.")
    .required("This field is required."),
});

export const LoginValidationSchema = yup.object({
  username: yup
    .string()
    .min(5, "Your username should be at least 5 characters long.")
    .matches(
      /^(?!.*\.(?:com|net))[A-Z0-9.]{5,}$/i,
      "Your username can contain only '.' and alphanumeric characters."
    )
    .required("This field is required."),
  password: yup
    .string()
    .min(6, "Your password should be at least 6 characters long.")
    .required("This field is required."),
});
