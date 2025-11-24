import * as yup from "yup";

export const purchaseReturnSchema = yup.object().shape({
  purchase_id: yup
    .number()
    .typeError("Purchase is required")
    .required("Purchase is required"),
  store_id: yup
    .number()
    .typeError("Store is required")
    .required("Store is required"),
  return_date: yup
    .string()
    .required("Return date is required"),
  reason: yup
    .string()
    .required("Overall reason is required")
    .min(3, "Reason must be at least 3 characters"),
  total_amount: yup
    .number()
    .typeError("Total amount must be a number")
    .min(0, "Total amount cannot be negative"),
  items: yup
    .array()
    .of(
      yup.object().shape({
        item_id: yup
          .number()
          .typeError("Item is required")
          .required("Item is required"),
        batch_no: yup
          .string()
          .required("Batch is required"),
        qty: yup
          .number()
          .typeError("Qty is required")
          .positive("Qty must be greater than 0")
          .required("Qty is required"),
        rate: yup
          .number()
          .typeError("Rate is required")
          .positive("Rate must be greater than 0")
          .required("Rate is required"),
        amount: yup
          .number()
          .typeError("Amount must be a number")
          .min(0, "Amount cannot be negative"),
        expiry_date: yup
          .string()
          .required("Expiry date is required"),
      })
    )
    .min(1, "At least one item is required"),
});