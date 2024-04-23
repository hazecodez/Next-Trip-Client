import * as Yup from "yup";

const ForgetSchema = Yup.object().shape({
  email: Yup.string()
    .required("The Email field is required")
    .email("Please enter valid Email Address"),
});

export default ForgetSchema;
