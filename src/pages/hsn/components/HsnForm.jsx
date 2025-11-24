import React, { useEffect } from "react";
import { TextField, Box } from "@mui/material";
import DraggableDialog from "../../../components/commen/DraggableDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { hsnSchema } from "../validation/hsnSchema";

export default function HsnForm({
  open,
  onClose,
  onSubmit,
  editMode,
  defaultValues,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(hsnSchema),
    defaultValues: {
      hsn_code: "",
      description: "",
      gst_percent: "",
      ...defaultValues,
    },
  });

  // When dialog opens or defaultValues change, reset form
  useEffect(() => {
    if (open) {
      reset({
        hsn_code: defaultValues?.hsn_code || "",
        description: defaultValues?.description || "",
        gst_percent: defaultValues?.gst_percent || "",
      });
    }
  }, [open, defaultValues, reset]);

  const onFormSubmit = (values) => {
    const payload = {
      ...values,
      hsn_code: values.hsn_code.trim(),
      description: values.description.trim(),
      gst_percent: values.gst_percent?.toString().trim() || null,
    };

    // pass reset so parent can clear form on success for "add"
    onSubmit(payload, () => {
      reset({
        hsn_code: "",
        description: "",
        gst_percent: "",
      });
    });
  };

  return (
    <DraggableDialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onFormSubmit)}
      editMode={editMode}
      title={editMode ? "Edit HSN" : "Add New HSN"}
      submitDisabled={isSubmitting}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" gap={2}>
          <TextField
            label="HSN Code"
            fullWidth
            size="small"
            required
            autoComplete="off"
            {...register("hsn_code")}
            error={!!errors.hsn_code}
            helperText={errors.hsn_code?.message}
          />

          <TextField
            label="GST %"
            fullWidth
            size="small"
            autoComplete="off"
            {...register("gst_percent")}
            error={!!errors.gst_percent}
            helperText={errors.gst_percent?.message}
          />
        </Box>

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          size="small"
          required
          autoComplete="off"
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </Box>
    </DraggableDialog>
  );
}
