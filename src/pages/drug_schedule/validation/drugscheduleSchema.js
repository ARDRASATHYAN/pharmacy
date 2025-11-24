import * as yup from "yup";

export const drugscheduleSchema = yup.object().shape({
  schedule_code: yup
    .string()
    .trim()
    .required("schedule_code is required"),

  schedule_name: yup
    .string()
    .trim()
    .required("schedule_name is required"),

  description: yup
    .string()
    .trim()
    .required("description is required"),

  requires_prescription: yup
    .string()
    .trim()
    .required("requires_prescription is required"),

  restricted_sale: yup
    .string()
    .trim()
     .required("restricted_sale is required"),
});
