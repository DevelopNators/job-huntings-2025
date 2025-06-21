import * as Yup from "yup";

export const profileFormInitials = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  title: "",
  bio: "",
};

export const profileSchema = Yup.object().shape({
  lastName: Yup.string().required("Last name is required"),
  firstName: Yup.string().required("First name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  location: Yup.string().required("Location is required"),
  title: Yup.string(),
  bio: Yup.string(),
});
