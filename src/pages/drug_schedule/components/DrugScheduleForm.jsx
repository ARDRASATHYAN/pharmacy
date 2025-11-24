import React, { useEffect } from "react";
import {
  TextField,
  Box,
} from "@mui/material";
import DraggableDialog from "../../../components/commen/DraggableDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { drugscheduleSchema } from "../validation/drugscheduleSchema";



export default function DrugScheduleForm({
  open,
  onClose,
  onSubmit,
  formData,
  onChange,
  editMode,
  defaultValues,
}) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(drugscheduleSchema),
    defaultValues: {
      schedule_code: "",
      schedule_name: "",
      description: "",
      requires_prescription: "",
      restricted_sale: "",
      ...defaultValues,
    },
  });


  useEffect(() => {
    if (open) {
      reset({
        schedule_code: defaultValues?.schedule_code || "",
        schedule_name: defaultValues?.schedule_name || "",
        description: defaultValues?.description || "",
        requires_prescription: defaultValues?.requires_prescription || "",
        restricted_sale: defaultValues?.restricted_sale || "",
      });
    }
  }, [open, defaultValues, reset]);


  const onFormSubmit = (values) => {
    const payload = {
      ...values,
      schedule_code: values.schedule_code.trim(),
      schedule_name: values.schedule_name.trim(),
      description: values.description?.trim() || null,
      requires_prescription: values.requires_prescription?.trim() || null,
      restricted_sale: values.restricted_sale?.trim() || null,
    };

    // pass reset so parent can clear form on success for "add"
    onSubmit(payload, () => {
      reset({
        schedule_code: "",
        schedule_name: "",
        description: "",
        requires_prescription: "",
        restricted_sale: "",
      });
    });
  };


  return (
    <DraggableDialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onFormSubmit)}
      editMode={editMode}
      title={editMode ? "Edit Drug Schedule" : "Add New Drug Schedule"}
      submitDisabled={isSubmitting}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" gap={2}>
          <TextField
            label="schedule_code"
            name="schedule_code"
            fullWidth
            size="small"
            required
            autoComplete="off"
            {...register("schedule_code")}
            error={!!errors.schedule_code}
            helperText={errors.schedule_code?.message}
          />
          <TextField
            label="schedule_name"
            name="schedule_name"
            fullWidth
            autoComplete="off"
            size="small"
            {...register("schedule_name")}
            error={!!errors.schedule_name}
            helperText={errors.schedule_name?.message}
          />
        </Box>


        <TextField
          label="description"
          name="description"
          type="text"
          fullWidth
          autoComplete="off"
          multiline
          rows={2}
          size="small"
          required
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <Box display="flex" gap={2}>
          <TextField
            label="requires_prescription"
            name="requires_prescription"
            fullWidth
            autoComplete="off"
            size="small"
            {...register("requires_prescription")}
            error={!!errors.requires_prescription}
            helperText={errors.requires_prescription?.message}
          />
          <TextField
            label="restricted_sale"
            name="restricted_sale"
            fullWidth
            autoComplete="off"
            size="small"
            {...register("restricted_sale")}
            error={!!errors.restricted_sale}
            helperText={errors.restricted_sale?.message}
          />
        </Box>
      </Box>
    </DraggableDialog>

  );
}
