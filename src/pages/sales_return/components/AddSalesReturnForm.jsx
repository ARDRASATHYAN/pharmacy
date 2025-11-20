import React, { useEffect, useState } from "react";
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
  Button,
} from "@mui/material";
import { AddCircleOutline, DeleteOutline } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { useStores } from "@/hooks/useStore";
import { useCurrentUser } from "@/hooks/useAuth";
import { useAddSalesReturn } from "@/hooks/useSalesReturn";
import { useSalesInvoiceList, useSaleItems } from "@/hooks/useSalesInvoice";

const emptyRow = { item_id: "", batch_no: "", qty: 0, rate: 0, amount: 0 };

export default function AddSalesReturnForm({ onClose }) {
  const { data: stores = [], isLoading: loadingStores } = useStores();
  const { data: currentUser } = useCurrentUser();
  const { data: salesInvoices = [] } = useSalesInvoiceList();
  const addSalesReturn = useAddSalesReturn();

  const [formData, setFormData] = useState({
    store_id: "",
    sale_id: "",
    return_date: null,
    reason: "",
    total_amount: 0,
  });

  const [rows, setRows] = useState([emptyRow]);

  // Fetch sale items for selected sale
  const { data: saleItems = [], isLoading: loadingSaleItems } = useSaleItems(formData.sale_id);

  // When sale is selected
  const handleSaleChange = (saleId) => {
    const selectedSale = salesInvoices.find((s) => s.sale_id === saleId);
    setFormData((prev) => ({
      ...prev,
      sale_id: saleId,
      store_id: selectedSale?.store_id || "",
    }));
    setRows([emptyRow]); // reset items
  };

  // Handle row changes
  const handleRowChange = (index, field, value) => {
    setRows((prev) => {
      const newRows = [...prev];
      const row = { ...newRows[index], [field]: value };

      // Auto-set rate and qty if item selected
      if (field === "item_id") {
        const selectedItem = saleItems.find((i) => i.item_id === value);
        if (selectedItem) {
          row.rate = selectedItem.rate;
          row.qty = selectedItem.qty; // available quantity
           row.batch_no = selectedItem.batch_no;
        }
      }

      row.amount = (parseFloat(row.qty || 0) * parseFloat(row.rate || 0)).toFixed(2);
      newRows[index] = row;
      return newRows;
    });
  };

  const handleAddRow = () => setRows((prev) => [...prev, emptyRow]);
  const handleRemoveRow = (index) => setRows((prev) => prev.filter((_, i) => i !== index));

  // Calculate total amount
  useEffect(() => {
    const total = rows.reduce((sum, r) => sum + Number(r.amount || 0), 0);
    setFormData((prev) => ({ ...prev, total_amount: total.toFixed(2) }));
  }, [rows]);

  const handleSubmit = () => {
    if (!formData.store_id) return alert("Select store");
    if (!formData.sale_id) return alert("Select sale");
    if (!rows.length) return alert("Add at least one item");

    const payload = {
      ...formData,
      items: rows.map((r) => ({
        item_id: r.item_id,
        batch_no: r.batch_no,
        qty: r.qty,
        rate: r.rate,
        amount: r.amount,
      })),
    };

    addSalesReturn.mutate(payload, { onSuccess: () => onClose?.() });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Header */}
      <Typography variant="h6">Sales Return</Typography>
      <Divider />
      <Box display="flex" gap={2}>
        <TextField
          select
          label="Sale"
          value={formData.sale_id}
          onChange={(e) => handleSaleChange(Number(e.target.value))}
          fullWidth
          size="small"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {salesInvoices.map((s) => (
            <MenuItem key={s.sale_id} value={s.sale_id}>
              {s.sale_id} - {s.bill_no}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Store"
          value={formData.store_id}
          fullWidth
          size="small"
          disabled
        >
          {stores.map((s) => (
            <MenuItem key={s.store_id} value={s.store_id}>
              {s.store_name}
            </MenuItem>
          ))}
        </TextField>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Return Date"
            value={formData.return_date ? dayjs(formData.return_date) : null}
            onChange={(newValue) =>
              setFormData((prev) => ({ ...prev, return_date: newValue?.toISOString() || null }))
            }
            slotProps={{ textField: { fullWidth: true, size: "small" } }}
          />
        </LocalizationProvider>
      </Box>

      <TextField
        label="Reason"
        value={formData.reason}
        onChange={(e) => setFormData((prev) => ({ ...prev, reason: e.target.value }))}
        fullWidth
        size="small"
        multiline
        minRows={1}
      />

      {/* Items Table */}
      <Paper variant="outlined" sx={{ mt: 1 }}>
        <Box display="flex" justifyContent="space-between" p={1}>
          <Typography>Items</Typography>
          <Tooltip title="Add Item">
            <IconButton size="small" onClick={handleAddRow}>
              <AddCircleOutline />
            </IconButton>
          </Tooltip>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell align="center">Del</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    select
                    value={row.item_id}
                    onChange={(e) => handleRowChange(index, "item_id", Number(e.target.value))}
                    fullWidth
                    size="small"
                  >
                    {saleItems.map((it) => (
                      <MenuItem key={it.item_id} value={it.item_id}>
                        {it.item_name} (Available: {it.qty})
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell>
                 <TextField
  select
  value={row.item_id}
  onChange={(e) => handleRowChange(index, "item_id", e.target.value)}
  fullWidth
  size="small"
>
  {saleItems.map((it) => (
    <MenuItem key={it.item_id + it.batch_no} value={it.item_id}>
      {it.batch_no}
    </MenuItem>
  ))}
</TextField>

                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={row.qty}
                    onChange={(e) => handleRowChange(index, "qty", Number(e.target.value))}
                    fullWidth
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField value={row.rate} fullWidth size="small" InputProps={{ readOnly: true }} />
                </TableCell>
                <TableCell>
                  <TextField value={row.amount} fullWidth size="small" InputProps={{ readOnly: true }} />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => handleRemoveRow(index)}>
                    <DeleteOutline />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
        <Typography variant="h6">Total: {formData.total_amount}</Typography>
        <Button variant="outlined" onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Save</Button>
      </Box>
    </Box>
  );
}
