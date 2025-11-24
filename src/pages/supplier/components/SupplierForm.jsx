import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  FormControlLabel,
  Switch,
  Box,
} from "@mui/material";
import DraggableDialog from "../../../components/commen/DraggableDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { supplierSchema } from "../validation/supplierSchema";




export default function SupplierForm({
  open,
  onClose,
  onSubmit,
  formData,
  onChange,
  defaultValues,
  editMode,
}) {
  
const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(supplierSchema),
    defaultValues: {
    supplier_name:"", address:"", state:"", gst_no:"",phone:"" ,email:"",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        supplier_name: defaultValues?.supplier_name || "",
        address: defaultValues?.address || "",
        email: defaultValues?.email || "",
        state: defaultValues?.state || "",
        gst_no: defaultValues?.gst_no || "",
        phone: defaultValues?.phone || "",
      });
    }
  }, [open, defaultValues, reset]);

  const onFormSubmit = (values) => {
    const payload = {
      ...values,
      supplier_name: values.supplier_name.trim(),
      address: values.address.trim(),
      email: values.email?.trim() || null,
      state: values.state?.trim() || null,
      gst_no: values.gst_no?.trim() || null,
      phone: values.phone?.trim() || null,
    };

    // pass reset so parent can clear form on success for "add"
    onSubmit(payload, () => {
      reset({
        supplier_name: "",
        address: "",
        email: "",
        state: "",
        gst_no: "",
        phone: "",
      });
    });
  };
   

  return (
    <DraggableDialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onFormSubmit)}
      editMode={editMode}
      title={editMode ? "Edit Supplier" : "Add New Supplier"}
       submitDisabled={isSubmitting}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" gap={2}>
          <TextField
            label="supplier_name"
            name="supplier_name"
             autoComplete="off"
            fullWidth
            size="small"
            required
           
          {...register("supplier_name")}
          error={!!errors.supplier_name}
          helperText={errors.supplier_name?.message}
          />
          <TextField
            label="phone"
            name="phone"
             autoComplete="off"
            fullWidth
            size="small"
             {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          />
        </Box>
       
          <TextField
            label="address"
            name="address"
              autoComplete="off"
            type="text"
            fullWidth
            multiline
            rows={4}
            size="small"
            required
             {...register("address")}
          error={!!errors.address}
          helperText={errors.address?.message}
          />
  
        <TextField
            label="state"
            name="state"
             autoComplete="off"
            type="text"
            fullWidth
            size="small"
            required
             {...register("state")}
          error={!!errors.state}
          helperText={errors.state?.message}
          />
        <Box display="flex" gap={2}>
          <TextField
            label="gst_no"
            name="gst_no"
            autoComplete="off"
            fullWidth
            size="small"
             {...register("gst_no")}
          error={!!errors.gst_no}
          helperText={errors.gst_no?.message}
          />
          <TextField
            label="email"
            name="email"
             autoComplete="off"
            fullWidth
            size="small"
             {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          />
        </Box>
        
        




      </Box>
    </DraggableDialog>

  );
}
