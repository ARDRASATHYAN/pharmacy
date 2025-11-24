import * as Yup from "yup";

export const hsnSchema = Yup.object().shape({
  hsn_code: Yup.string()
    .trim()
    .required("Username is required"),
    

  description: Yup.string()
    .trim()
    .required("description is required"),
   

  gst_percent: Yup.string().required("gst_percent is required"),

 
});
