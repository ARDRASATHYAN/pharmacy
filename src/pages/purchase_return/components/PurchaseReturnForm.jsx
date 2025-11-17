import React, { useEffect, useMemo, useState } from "react";
import {
  TextField,
  MenuItem,
  Box,
  Grid,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { AddCircleOutline, DeleteOutline } from "@mui/icons-material";
import DraggableDialog from "../../../components/commen/DraggableDialog";
import { useStores } from "@/hooks/useStore";
import { useitem } from "@/hooks/useItem";

// Each row represents one product in the return
const emptyItemRow = {
  item_id: "",
  batch_no: "",
  qty: "",
  rate: "",
  amount: "",
  reason: "",
  expiry_date: "",
};

export default function PurchaseReturnForm({
  open,
  onClose,
  onSubmit,
  formData = {},
  editMode,
}) {
  const { data: stores = [], isLoading: loadingStores } = useStores();
  const { data: items = [], isLoading: loadingItems } = useitem();

  // Header level state
  const [header, setHeader] = useState({
    purchase_id: "",
    store_id: "",
    return_date: "",
    reason: "", // general note (optional)
    total_amount: "",
  });

  // Multiple item rows
  const [rows, setRows] = useState([emptyItemRow]);

  // Hydrate in edit mode or reset when dialog opens/closes
  useEffect(() => {
    if (formData && editMode) {
      setHeader({
        purchase_id: formData.purchase_id || "",
        store_id: formData.store_id || "",
        return_date: formData.return_date || "",
        reason: formData.reason || "",
        total_amount: formData.total_amount || "",
      });

      setRows(
        Array.isArray(formData.items) && formData.items.length > 0
          ? formData.items.map((r) => ({
              item_id: r.item_id || "",
              batch_no: r.batch_no || "",
              qty: r.qty || "",
              rate: r.rate || "",
              amount: r.amount || "",
              reason: r.reason || "",
              expiry_date: r.expiry_date || "",
            }))
          : [emptyItemRow]
      );
    } else if (!editMode) {
      setHeader({
        purchase_id: "",
        store_id: "",
        return_date: "",
        reason: "",
        total_amount: "",
      });
      setRows([emptyItemRow]);
    }
  }, [formData, editMode, open]);

  // Handle header change
  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeader((prev) => ({ ...prev, [name]: value }));
  };

  // Handle row change (per item)
  const handleRowChange = (index, field, value) => {
    setRows((prev) => {
      const updated = [...prev];
      const row = { ...updated[index], [field]: value };

      // auto-calc amount when qty or rate changes
      if (field === "qty" || field === "rate") {
        const qtyNum = parseFloat(row.qty) || 0;
        const rateNum = parseFloat(row.rate) || 0;
        row.amount =
          qtyNum === 0 && rateNum === 0 ? "" : (qtyNum * rateNum).toFixed(2);
      }

      updated[index] = row;
      return updated;
    });
  };

  const handleAddRow = () => {
    setRows((prev) => [...prev, emptyItemRow]);
  };

  const handleRemoveRow = (index) => {
    setRows((prev) => {
      if (prev.length === 1) return prev; // at least one row
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  // Auto computed total from items
  const computedTotal = useMemo(() => {
    return rows
      .reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0)
      .toFixed(2);
  }, [rows]);

  // Keep total_amount in sync (can still be overridden by user if you want)
  useEffect(() => {
    setHeader((prev) => ({
      ...prev,
      total_amount: computedTotal,
    }));
  }, [computedTotal]);

  // Final submit handler
  const handleSubmit = () => {
    const payload = {
      ...header,
      items: rows.filter((r) => r.item_id), // keep only rows with an item selected
    };

    if (onSubmit) onSubmit(payload);
  };

  return (
    <DraggableDialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      editMode={editMode}
      title={editMode ? "Edit Purchase Return" : "Add Purchase Return"}
      width="lg"
      fullWidth
    >
      <Box display="flex" flexDirection="column" gap={3}>
        {/* Header Info */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Return Details
          </Typography>
          <Divider />
          <Grid container spacing={2} mt={1}>
            {/* Purchase ID */}
            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Purchase ID"
                name="purchase_id"
                value={header.purchase_id}
                onChange={handleHeaderChange}
                fullWidth
                disabled={editMode}
                size="small"
                required
              >
                {loadingStores ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : stores.length === 0 ? (
                  <MenuItem disabled>No purchases found</MenuItem>
                ) : (
                  stores.map((s) => (
                    <MenuItem key={s.store_id} value={s.store_id}>
                      {s.store_id} — {s.store_name || "Store"}
                    </MenuItem>
                  ))
                )}
              </TextField>
            </Grid>

            {/* Store */}
            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Store"
                name="store_id"
                value={header.store_id}
                onChange={handleHeaderChange}
                fullWidth
                disabled={editMode}
                size="small"
                required
              >
                {loadingStores ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : stores.length === 0 ? (
                  <MenuItem disabled>No stores found</MenuItem>
                ) : (
                  stores.map((s) => (
                    <MenuItem key={s.store_id} value={s.store_id}>
                      {s.store_name || `Store #${s.store_id}`}
                    </MenuItem>
                  ))
                )}
              </TextField>
            </Grid>

            {/* Return Date */}
            <Grid item xs={12} sm={4}>
              <TextField
                label="Return Date"
                name="return_date"
                value={header.return_date}
                onChange={handleHeaderChange}
                type="date"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            {/* Overall Reason / Note */}
            <Grid item xs={12}>
              <TextField
                label="Overall Note (Optional)"
                name="reason"
                value={header.reason}
                onChange={handleHeaderChange}
                fullWidth
                multiline
                minRows={2}
                maxRows={4}
                size="small"
                placeholder="Any general note for this return (optional)"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Items Table */}
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Return Items
            </Typography>
            <Tooltip title="Add Item">
              <IconButton onClick={handleAddRow} size="small">
                <AddCircleOutline />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider />

          <Paper
            variant="outlined"
            sx={{ mt: 1, maxHeight: 360, overflow: "auto" }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 200 }}>Item</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Batch No.</TableCell>
                  <TableCell sx={{ minWidth: 80 }}>Qty</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Rate</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Amount</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Reason</TableCell>
                  <TableCell sx={{ minWidth: 140 }}>Expiry Date</TableCell>
                  <TableCell sx={{ width: 60 }} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    {/* Item */}
                    <TableCell>
                      <TextField
                        select
                        name="item_id"
                        value={row.item_id}
                        onChange={(e) =>
                          handleRowChange(index, "item_id", e.target.value)
                        }
                        fullWidth
                        size="small"
                        required
                      >
                        {loadingItems ? (
                          <MenuItem disabled>Loading...</MenuItem>
                        ) : items.length === 0 ? (
                          <MenuItem disabled>No items found</MenuItem>
                        ) : (
                          items.map((i) => (
                            <MenuItem key={i.item_id} value={i.item_id}>
                              {i.item_name || `Item #${i.item_id}`}
                            </MenuItem>
                          ))
                        )}
                      </TextField>
                    </TableCell>

                    {/* Batch */}
                    <TableCell>
                      <TextField
                        name="batch_no"
                        value={row.batch_no}
                        onChange={(e) =>
                          handleRowChange(index, "batch_no", e.target.value)
                        }
                        fullWidth
                        size="small"
                      />
                    </TableCell>

                    {/* Qty */}
                    <TableCell>
                      <TextField
                        name="qty"
                        type="number"
                        value={row.qty}
                        onChange={(e) =>
                          handleRowChange(index, "qty", e.target.value)
                        }
                        fullWidth
                        size="small"
                        inputProps={{ min: 0, step: "1" }}
                      />
                    </TableCell>

                    {/* Rate */}
                    <TableCell>
                      <TextField
                        name="rate"
                        type="number"
                        value={row.rate}
                        onChange={(e) =>
                          handleRowChange(index, "rate", e.target.value)
                        }
                        fullWidth
                        size="small"
                        inputProps={{ min: 0, step: "0.01" }}
                      />
                    </TableCell>

                    {/* Amount */}
                    <TableCell>
                      <TextField
                        name="amount"
                        type="number"
                        value={row.amount}
                        onChange={(e) =>
                          handleRowChange(index, "amount", e.target.value)
                        }
                        fullWidth
                        size="small"
                        inputProps={{ min: 0, step: "0.01" }}
                      />
                    </TableCell>

                    {/* Reason per item */}
                    <TableCell>
                      <TextField
                        select
                        name="reason"
                        value={row.reason}
                        onChange={(e) =>
                          handleRowChange(index, "reason", e.target.value)
                        }
                        fullWidth
                        size="small"
                      >
                        <MenuItem value="">Select reason</MenuItem>
                        <MenuItem value="expired">Expired</MenuItem>
                        <MenuItem value="damaged">Damaged</MenuItem>
                        <MenuItem value="near_expiry">Near Expiry</MenuItem>
                        <MenuItem value="wrong_item">
                          Wrong Item Supplied
                        </MenuItem>
                        <MenuItem value="others">Others</MenuItem>
                      </TextField>
                    </TableCell>

                    {/* Expiry Date per item */}
                    <TableCell>
                      <TextField
                        type="date"
                        name="expiry_date"
                        value={row.expiry_date}
                        onChange={(e) =>
                          handleRowChange(index, "expiry_date", e.target.value)
                        }
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                      />
                    </TableCell>

                    {/* Delete row */}
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveRow(index)}
                        disabled={rows.length === 1}
                      >
                        <DeleteOutline fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>

        {/* Amount Summary */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Amount Summary
          </Typography>
          <Divider />
          <Grid container spacing={2} mt={1} justifyContent="flex-end">
            <Grid item xs={12} sm={4}>
              <TextField
                label="Total Return Amount"
                name="total_amount"
                value={header.total_amount}
                onChange={handleHeaderChange}
                type="number"
                fullWidth
                size="small"
                inputProps={{ min: 0, step: "0.01" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </DraggableDialog>
  );
}
