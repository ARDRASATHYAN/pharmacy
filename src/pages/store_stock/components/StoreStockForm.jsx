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
import { useHsn } from "@/hooks/useHsn";
import { useDrugSchedule } from "@/hooks/useDrugSchedule";
import { Controller, useForm } from "react-hook-form";
import { useStores } from "@/hooks/useStore";
import { useitem } from "@/hooks/useItem";



export default function StoreStockForm({
  open,
  onClose,
  onSubmit,
  formData,
  onChange,
  editMode,
}) {


  const { data: store = [], isLoading: loadingHsn } = useStores();
  const { data: item = [], isLoading: loadingSchedule } = useitem();

  return (
    <DraggableDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      editMode={editMode}
      title={editMode ? "Edit Stock" : "Add New Stock"}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" gap={2}>
         
          <TextField
            label="batch_no"
            name="batch_no"
            value={formData.batch_no}
            onChange={onChange}
            type="text"
            fullWidth
            size="small"
            required
          />
           <TextField
            label="expiry_date"
            name="expiry_date"
            value={formData.expiry_date}
            onChange={onChange}
            type="date"
            fullWidth
            size="small"
            required
          />
          <TextField
            label="mrp"
            name="mrp"
            value={formData.mrp}
            onChange={onChange}
            fullWidth
            size="small"
          />
        </Box>
      
        <Box display="flex" gap={2}>
           <TextField
          label="purchase_rate"
          name="purchase_rate"
          value={formData.purchase_rate}
          onChange={onChange}
          type="text"
          fullWidth
          size="small"
          required
        />
          <TextField
            label="sale_rate"
            name="sale_rate"
            value={formData.sale_rate}
            onChange={onChange}
            fullWidth
            size="small"
          />
          <TextField
            label="gst_percent"
            name="gst_percent"
            value={formData.gst_percent}
            onChange={onChange}
            fullWidth
            size="small"
          />
        </Box>
       
          <TextField
            label="qty_in_stock"
            name="qty_in_stock"
            value={formData.qty_in_stock}
            onChange={onChange}
            fullWidth
            size="small"
          />
         
 <Box display="flex" gap={2}>
          <TextField
            select
            label="store_id"
            name="store_id"
            value={formData.store_id || ""}
            onChange={onChange}
            fullWidth
            disabled={editMode}
            size="small"
          >
            {loadingHsn ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : (
              store.map((store) => (
                <MenuItem key={store.store_id} value={store.store_id}>
                  {store.store_id} — {store.store_id}
                </MenuItem>
              ))
            )}
          </TextField>

          <TextField
            select
            label="item_id"
            name="item_id"
            value={formData.item_id || ""}
            onChange={onChange}
            fullWidth
            disabled={editMode}
            size="small"
          >
            {loadingSchedule ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : (
              item.map((s) => (
                <MenuItem key={s.item_id} value={s.item_id}>
                  {s.item_id}
                </MenuItem>
              ))
            )}
          </TextField>
        </Box>
       
    
       




      </Box>
    </DraggableDialog>

  );
}
