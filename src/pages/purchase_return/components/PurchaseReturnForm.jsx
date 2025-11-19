import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Box,
  Grid,
  Typography,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

import { AddCircleOutline, DeleteOutline } from "@mui/icons-material";
import { useCurrentUser } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import purchaseService from "@/services/purchaseService";
import apiClient from "@/services/apiClient";
import { useStores } from "@/hooks/useStore";
import { usepurchaseitems } from "@/hooks/usePurchaseInvoice";
import { useitem } from "@/hooks/useItem";

const emptyItemRow = {
  item_id: "",
  batch_no: "",
  qty: "",
  rate: "",
  amount: "",
  reason: "",
  expiry_date: "",
};

export default function PurchaseReturnForm({ onClose, onSubmit, editMode }) {
  // ------------------------------
  // LOAD DATA
  // ------------------------------

  const { data: storeList = [] } = useStores();

  const { data: purchaseList = [] } = useQuery({
    queryKey: ["purchase-invoices"],
    queryFn: purchaseService.getpurchaseInvoise,
  });

  const { data: items = [] } = useitem();


  const { data: purchaseItems = [] } = usepurchaseitems();

  const { data: currentUser } = useCurrentUser();

  // ------------------------------
  // STATES
  // ------------------------------

  const [header, setHeader] = useState({
    purchase_id: "",
    store_id: "",
    return_date: "",
    reason: "",
    total_amount: 0,
  });

  const [rows, setRows] = useState([emptyItemRow]);

  // ------------------------------
  // AUTO-FILL STORE + ITEMS WHEN PURCHASE SELECTED
  // ------------------------------

  useEffect(() => {
    if (!header.purchase_id) return;

    // 1️⃣ Auto-fill store ID
    const selectedPurchase = purchaseList.find(
      (p) => p.purchase_id == header.purchase_id
    );

    if (selectedPurchase) {
      setHeader((prev) => ({
        ...prev,
        store_id: selectedPurchase.store_id,
      }));
    }

    // 2️⃣ Filter purchaseItems by selected purchase_id
    const filtered = purchaseItems.filter(
      (item) => item.purchase_id == header.purchase_id
    );

    // 3️⃣ Map purchase items to table rows
    const mapped = filtered.map((item) => ({
      item_id: item.item_id,
      batch_no: item.batch_no,
      qty: "",
      rate: item.purchase_rate,
      amount: "",
      reason: "",
      expiry_date: item.expiry_date,
    }));

    setRows(mapped);
  }, [header.purchase_id, purchaseList, purchaseItems]);

  // ------------------------------
  // HANDLERS
  // ------------------------------

  const handleHeaderChange = (e) => {
    setHeader({ ...header, [e.target.name]: e.target.value });
  };

  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;

    if (field === "qty" || field === "rate") {
      const qty = parseFloat(updated[index].qty || 0);
      const rate = parseFloat(updated[index].rate || 0);
      updated[index].amount = (qty * rate).toFixed(2);
    }

    setRows(updated);
  };

  const handleAddRow = () => {
    setRows([...rows, { ...emptyItemRow }]);
  };

  const handleRemoveRow = (index) => {
    if (rows.length === 1) return;
    setRows(rows.filter((_, i) => i !== index));
  };

  // ------------------------------
  // AUTO TOTAL
  // ------------------------------

  useEffect(() => {
    const total = rows.reduce(
      (sum, r) => sum + parseFloat(r.amount || 0),
      0
    );

    setHeader((prev) => ({ ...prev, total_amount: total.toFixed(2) }));
  }, [rows]);

  // ------------------------------
  // SUBMIT
  // ------------------------------

  const handleSubmit = async () => {
    try {
      const payload = {
        purchase_id: header.purchase_id,
        store_id: header.store_id,
        created_by: currentUser?.user_id,
        return_date: header.return_date,
        reason: header.reason,
        items: rows.map((r) => ({
          item_id: r.item_id,
          batch_no: r.batch_no,
          qty: Number(r.qty),
          rate: Number(r.rate),
          item_reason: r.reason,
          expiry_date: r.expiry_date,
        })),
      };

      const res = await apiClient.post("/purchasereturn", payload);

      if (onSubmit) onSubmit(res.data);
      if (onClose) onClose();
    } catch (err) {
      alert(err?.response?.data?.message || "Error submitting return.");
    }
  };

  const getItemName = (item_id) => {
    const found = items.find((i) => i.item_id == item_id);
    return found ? found.name : "";
  };


  // ------------------------------
  // UI
  // ------------------------------

  return (
    <Box gap={3} sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" fontWeight={600}>
        Purchase Return
      </Typography>
      <Divider />

      {/* HEADER */}
      <Box display="flex" gap={2}>
        <TextField
          select
          label="Purchase ID"
          name="purchase_id"
          value={header.purchase_id}
          onChange={handleHeaderChange}
          fullWidth
          size="small"
        >
          {purchaseList.map((p) => (
            <MenuItem key={p.purchase_id} value={p.purchase_id}>
              {p.purchase_id} — {p.invoice_no}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Store"
          name="store_id"
          value={header.store_id}
          onChange={handleHeaderChange}
          fullWidth
          size="small"
        >
          {storeList.map((s) => (
            <MenuItem key={s.store_id} value={s.store_id}>
              {s.store_name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="date"
          label="Return Date"
          name="return_date"
          value={header.return_date}
          onChange={handleHeaderChange}
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <TextField
        label="Overall Reason"
        name="reason"
        fullWidth
        multiline
        minRows={2}
        value={header.reason}
        onChange={handleHeaderChange}
        size="small"
      />

      {/* ITEMS TABLE */}
      <Box mt={3}>
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight={600}>Return Items</Typography>
          <IconButton onClick={handleAddRow}>
            <AddCircleOutline />
          </IconButton>
        </Box>
        <Divider />

        <Paper sx={{ mt: 1, maxHeight: 350, overflow: "auto" }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Batch</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Expiry</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      select
                      size="small"
                      fullWidth
                      value={row.item_id}
                      onChange={(e) =>
                        handleRowChange(index, "item_id", e.target.value)
                      }
                    >
                      {purchaseItems
                        .filter((i) => i.purchase_id == header.purchase_id)
                        .map((item) => (
                          <MenuItem key={item.item_id} value={item.item_id}>
                            {getItemName(item.item_id)}
                          </MenuItem>
                        ))}
                    </TextField>

                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      fullWidth
                      value={row.batch_no}
                      onChange={(e) =>
                        handleRowChange(index, "batch_no", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      fullWidth
                      value={row.qty}
                      onChange={(e) =>
                        handleRowChange(index, "qty", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      fullWidth
                      value={row.rate}
                      onChange={(e) =>
                        handleRowChange(index, "rate", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <TextField size="small" fullWidth value={row.amount} />
                  </TableCell>

                

                  <TableCell>
                    <TextField
                      type="date"
                      size="small"
                      fullWidth
                      value={row.expiry_date}
                      onChange={(e) =>
                        handleRowChange(index, "expiry_date", e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>

                  <TableCell>
                    <IconButton
                      onClick={() => handleRemoveRow(index)}
                      disabled={rows.length === 1}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </Paper>
      </Box>

      {/* TOTAL */}
      <Box mt={2}>
        <Grid container justifyContent="flex-end">
          <Grid item xs={4}>
            <TextField
              label="Total Amount"
              fullWidth
              value={header.total_amount}
              size="small"
            />
          </Grid>
        </Grid>
      </Box>

      {/* FOOTER */}
      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit Return
        </Button>
      </Box>
    </Box>
  );
}
