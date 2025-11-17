// src/components/purchase/PurchaseForm.jsx
import React, { useEffect } from "react";
import { TextField, MenuItem, Box, Button, Typography } from "@mui/material";

import { useStores } from "@/hooks/useStore";
import { useSupplier } from "@/hooks/useSupplier";
import { useUsers } from "@/hooks/useUsers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useCurrentUser } from "@/hooks/useAuth";
import DraggableDialog from "@/components/commen/DraggableDialog";
import { useitem } from "@/hooks/useItem"; // 👈 make sure this name matches your hook

export default function PurchaseForm({
  open,
  onClose,
  onSubmit,
  formData,
  onChange,
  itemDraft,
  onItemChange,
  items,
  onAddItem,
  editMode,
}) {
  const { data: store = [], isLoading: loadingStore } = useStores();
  const { data: supplier = [], isLoading: loadingSupplier } = useSupplier();
  const { data: usersResponse, isLoading: loadingUser } = useUsers();
  const { data: currentUserResponse, isLoading: currentuserloading } =
    useCurrentUser();

  // 🔹 normalize currentUser
  const currentUser = Array.isArray(currentUserResponse)
    ? currentUserResponse[0]
    : currentUserResponse || null;

  // 🔹 normalize users list
  const usersList = Array.isArray(usersResponse?.data)
    ? usersResponse.data
    : Array.isArray(usersResponse)
    ? usersResponse
    : [];

  // 🔹 Master items list (for dropdown + GST + pack qty)
  const { data: itemsMaster = [], isLoading: loadingItems } = useitem();

  console.log("currentUser in form:", currentUser);
  console.log("formData.user_id INSIDE FORM:", formData.user_id);

  // 👤 Auto-set created_by (login user) into formData.user_id (for display / edit)
  useEffect(() => {
    if (
      currentUser &&
      currentUser.user_id &&
      !formData.user_id // only set if not already set
    ) {
      onChange({
        target: { name: "user_id", value: currentUser.user_id },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.user_id]);

  return (
    <DraggableDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      editMode={editMode}
      title={editMode ? "Edit Purchase Invoice" : "Add Purchase Invoice"}
      width="lg"
    >
      <Box display="flex" flexDirection="column" gap={2}>
        {/* Row 1 - Invoice header */}
        <Box display="flex" gap={2}>
          <TextField
            label="Invoice No"
            name="invoice_no"
            value={formData.invoice_no}
            onChange={onChange}
            fullWidth
            size="small"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Invoice Date"
              value={
                formData.invoice_date ? dayjs(formData.invoice_date) : null
              }
              onChange={(newValue) =>
                onChange({
                  target: {
                    name: "invoice_date",
                    value: newValue ? newValue.toISOString() : null,
                  },
                })
              }
              slotProps={{
                textField: { fullWidth: true, size: "small", required: true },
              }}
            />
          </LocalizationProvider>

          <TextField
            select
            label="Supplier"
            name="supplier_id"
            value={formData.supplier_id || ""}
            onChange={onChange}
            fullWidth
            size="small"
          >
            {loadingSupplier ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : (
              supplier.map((s) => (
                <MenuItem key={s.supplier_id} value={s.supplier_id}>
                  {s.supplier_name || s.supplier_id}
                </MenuItem>
              ))
            )}
          </TextField>

          <TextField
            select
            label="Store"
            name="store_id"
            value={formData.store_id || ""}
            onChange={onChange}
            fullWidth
            size="small"
          >
            {loadingStore ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : (
              store.map((s) => (
                <MenuItem key={s.store_id} value={s.store_id}>
                  {s.store_name || s.store_id}
                </MenuItem>
              ))
            )}
          </TextField>
        </Box>

        {/* Items section */}
        <Typography variant="h6" mt={2}>
          Items
        </Typography>

        {/* Item input row 1 */}
        <Box display="flex" gap={2}>
          {/* Item dropdown with auto GST + pack qty */}
          <TextField
            select
            label="Item"
            name="item_id"
            value={itemDraft.item_id || ""}
            onChange={(e) => {
              const { value } = e.target;

              // 1️⃣ update item_id
              onItemChange({
                target: { name: "item_id", value },
              });

              // 2️⃣ find selected item from master list
              const selectedItem = itemsMaster.find(
                (it) => it.item_id === Number(value)
              );

              if (selectedItem) {
                // 3️⃣ auto-fill GST from HSN if available
                if (
                  selectedItem.hsn &&
                  selectedItem.hsn.gst_percent != null
                ) {
                  onItemChange({
                    target: {
                      name: "gst_percent",
                      value: selectedItem.hsn.gst_percent,
                    },
                  });
                }

                // 4️⃣ auto-fill pack qty from item table
                //    change 'pack_size' to your actual column name if different
                if (selectedItem.pack_size != null) {
                  onItemChange({
                    target: {
                      name: "pack_qty",
                      value: selectedItem.pack_size,
                    },
                  });
                }
              }
            }}
            fullWidth
            size="small"
            required
          >
            {loadingItems ? (
              <MenuItem disabled>Loading items...</MenuItem>
            ) : (
              itemsMaster.map((it) => (
                <MenuItem key={it.item_id} value={it.item_id}>
                  {it.item_name || it.name || `Item #${it.item_id}`}
                </MenuItem>
              ))
            )}
          </TextField>

          <TextField
            label="Batch No"
            name="batch_no"
            value={itemDraft.batch_no}
            onChange={onItemChange}
            fullWidth
            size="small"
            required
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Expiry Date"
              value={
                itemDraft.expiry_date ? dayjs(itemDraft.expiry_date) : null
              }
              onChange={(newValue) =>
                onItemChange({
                  target: {
                    name: "expiry_date",
                    value: newValue ? newValue.toISOString() : null,
                  },
                })
              }
              slotProps={{
                textField: { fullWidth: true, size: "small", required: true },
              }}
            />
          </LocalizationProvider>

          <TextField
            label="Pack Qty"
            name="pack_qty"
            value={itemDraft.pack_qty}
            onChange={onItemChange}
            fullWidth
            size="small"
          />
        </Box>

        {/* Item input row 2 */}
        <Box display="flex" gap={2}>
          <TextField
            label="Qty"
            name="qty"
            value={itemDraft.qty}
            onChange={onItemChange}
            fullWidth
            size="small"
            required
          />
          <TextField
            label="Purchase Rate"
            name="purchase_rate"
            value={itemDraft.purchase_rate}
            onChange={onItemChange}
            fullWidth
            size="small"
            required
          />
          <TextField
            label="MRP"
            name="mrp"
            value={itemDraft.mrp}
            onChange={onItemChange}
            fullWidth
            size="small"
          />
          <TextField
            label="GST %"
            name="gst_percent"
            value={itemDraft.gst_percent}
            onChange={onItemChange}
            fullWidth
            size="small"
            InputProps={{ readOnly: true }} // 👈 locked to HSN
          />
          <TextField
            label="Discount %"
            name="discount_percent"
            value={itemDraft.discount_percent}
            onChange={onItemChange}
            fullWidth
            size="small"
          />
        </Box>

        {/* Add item button */}
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2563eb",
              "&:hover": { backgroundColor: "#1e40af" },
              borderRadius: 2,
            }}
            onClick={onAddItem}
          >
            Add Item
          </Button>
        </Box>

        {/* Simple list of added items */}
        {items.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle1">Added Items</Typography>
            {items.map((it, idx) => (
              <Box
                key={idx}
                display="flex"
                gap={2}
                sx={{ fontSize: 14, paddingY: 0.5 }}
              >
                <span>#{idx + 1}</span>
                <span>Item ID: {it.item_id}</span>
                <span>Batch: {it.batch_no}</span>
                <span>Qty: {it.qty}</span>
                <span>Rate: {it.purchase_rate}</span>
              </Box>
            ))}
          </Box>
        )}

        {/* Created By display (read-only) */}
        <TextField
          label="Created By"
          value={
            currentUser
              ? currentUser.username
              : usersList.find((u) => u.user_id === formData.user_id)
                  ?.username || ""
          }
          fullWidth
          size="small"
          InputProps={{ readOnly: true }}
        />
      </Box>
    </DraggableDialog>
  );
}
