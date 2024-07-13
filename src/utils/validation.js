import * as Yup from "yup";

// ==================  AUTH   ===================//

export const signInValidationSChame = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must")
    .required("Password in required"),
});

// ==================  Workers  ===================//
export const workerValidationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  age: Yup.string().required("Age is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must")
    .required("Password in required"),
  phone_number: Yup.string()
    .min(19, "Invalid phone number")
    .required("phone is required"),
});

// ==================  Product  ===================//
export const productValidationSchema = Yup.object().shape({
  age_max: Yup.string().required("Age max is required"),
  age_min: Yup.string().required("Age min is required"),
  color: Yup.string().required("Color is required"),
  cost: Yup.string().required("Cost is required"),
  count: Yup.string().required("Count is required"),
  description: Yup.string().required("Description is required"),
  product_name: Yup.string().required("Name is required"),
  size: Yup.string().required("Size is required"),
  discount: Yup.string().required("Discount is required"),
});
