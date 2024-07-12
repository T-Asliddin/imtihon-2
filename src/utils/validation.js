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
  first_name:Yup.string().required("First Name is required"),
  last_name:Yup.string().required("Last Name is required"),
  age:Yup.string().required("Age is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must")
    .required("Password in required"),
    phone_number:Yup.string().min(19, "Invalid phone number").required("phone is required")
});
