import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .required("The Name field is required")
    .test(
      "min-characters",
      "Name must be at least 3 characters long",
      function (value) {
        // Remove spaces and numbers, then check the length
        const alphabeticCharacters = value
          ? value.replace(/[^a-zA-Z]/g, "")
          : "";
        return alphabeticCharacters.length >= 3;
      }
    ),
  email: Yup.string()
    .required("The Email field is required")
    .email("Please enter valid Email Address"),
  password: Yup.string()
    .required("The Password field is required")
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "The Password confirmation doesn't match.")
    .required("The Confirm Password field is required."),
});

export default SignUpSchema;
