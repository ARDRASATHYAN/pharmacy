import React from "react";
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




export default function SupplierForm({
  open,
  onClose,
  onSubmit,
  formData,
  onChange,
  editMode,
}) {
  

   

  return (
    <DraggableDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      editMode={editMode}
      title={editMode ? "Edit Supplier" : "Add New Supplier"}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" gap={2}>
          <TextField
            label="supplier_name"
            name="supplier_name"
            value={formData.supplier_name}
            onChange={onChange}
            fullWidth
            size="small"
            required
          />
          <TextField
            label="phone"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            fullWidth
            size="small"
          />
        </Box>
       
          <TextField
            label="address"
            name="address"
            value={formData.address}
            onChange={onChange}
            type="text"
            fullWidth
            multiline
            rows={4}
            size="small"
            required
          />
  
        <TextField
            label="state"
            name="state"
            value={formData.state}
            onChange={onChange}
            type="text"
            fullWidth
            size="small"
            required
          />
        <Box display="flex" gap={2}>
          <TextField
            label="gst_no"
            name="gst_no"
            value={formData.gst_no}
            onChange={onChange}
            fullWidth
            size="small"
          />
          <TextField
            label="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            fullWidth
            size="small"
          />
        </Box>
        
        




      </Box>
    </DraggableDialog>

  );
}
