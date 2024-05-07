import * as Yup from "yup";

const AddTraveler = Yup.object().shape({
  name: Yup.string().required("The Name field is required"),
  age: Yup.number()
    .required("The Age field is required")
    .min(5, "Age must be greater than or equal to 5")
    .max(80, "Age must be less than or equal to 80"),
});

export default AddTraveler;
