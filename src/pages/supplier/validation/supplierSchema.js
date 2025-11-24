import * as Yup from "yup";

export const supplierSchema = Yup.object().shape({
  supplier_name: Yup.string()
    .trim()
    .required("Supplier name is required"),
   
  phone: Yup.string()
    .trim()
    .nullable()
    .matches(
      /^(\+?\d{7,15})?$/,
      "Phone must be a valid number (7–15 digits, optional +)"
    ),

  address: Yup.string()
    .trim()
    .required("Address is required"),
   

  state: Yup.string()
    .trim()
    .required("State is required"),
  

  gst_no: Yup.string()
    .trim()
     .required("gst_no is required"),
   
  email: Yup.string()
    .trim()
    .email("Invalid email format"),
});
