import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),

  password: Yup.string()
    .trim()
    .when("isNew", {
      is: (isNew) => isNew === true,
      then: (schema) =>
        schema.required("Password is required").min(6, "Min 6 characters"),
      otherwise: (schema) => schema.notRequired(),
    }),

  // full_name: Yup.string()
  //   .trim()
  //   // .required("Full name is required")
  //   .min(3, "Full name must be at least 3 characters"),

  role: Yup.string().required("Role is required"),

  is_active: Yup.boolean().required(),
});
