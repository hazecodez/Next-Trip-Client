import * as Yup from "yup";

const BlogSchema = Yup.object().shape({
  caption: Yup.string().required("Caption is required."),
  location: Yup.string().required("Location is required"),
  experience: Yup.string().required("Experience is required"),
});

export default BlogSchema;
