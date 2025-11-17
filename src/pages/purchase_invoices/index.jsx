// src/components/purchase/PurchaseInvoiceMockApiHeader.jsx
import React, { useState } from "react";
import { Button } from "@mui/material";
import BasicTable from "@/components/commen/BasicTable";

import {
  useAddpurchaseinvoice,
  useDeletepurchaseinvoice,
  usepurchaseinvoice,
  useUpdatepurchaseinvoice,
} from "@/hooks/usePurchaseInvoice";
import { getPurchaseInvoiceColumns } from "./components/PurchaseInvoicesHeader";
import PurchaseForm from "../purchase/PurchaseForm";
import { useCurrentUser } from "@/hooks/useAuth";

export default function PurchaseInvoiceMockApiHeader() {
  const { data: purchaseinvoice = [], isLoading, isFetching } =
    usepurchaseinvoice();
  const addpurchaseinvoice = useAddpurchaseinvoice();
  const updatepurchaseinvoice = useUpdatepurchaseinvoice();
  const deletepurchaseinvoice = useDeletepurchaseinvoice();

  // 🔐 Get current logged-in user
  const { data: currentUserResponse } = useCurrentUser();

  // normalize current user: can be object or array
  const currentUser = Array.isArray(currentUserResponse)
    ? currentUserResponse[0]
    : currentUserResponse || null;

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // 🧾 Invoice header state (formData)
  const [formData, setFormData] = useState({
    purchase_id: "",
    invoice_no: "",
    invoice_date: "",
    supplier_id: "",
    store_id: "",
    user_id: "", // we can use for display; backend uses currentUser.user_id
    total_amount: "",
    total_discount: "",
    total_gst: "",
    net_amount: "",
  });

  // 🧱 Single item row being edited (add-item section)
  const [itemDraft, setItemDraft] = useState({
    item_id: "",
    batch_no: "",
    expiry_date: "",
    pack_qty: "",
    qty: "",
    purchase_rate: "",
    mrp: "",
    gst_percent: "",
    discount_percent: "",
  });

  // 📦 Items added to this invoice
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    if (!itemDraft.item_id || !itemDraft.qty || !itemDraft.purchase_rate) {
      alert("Item, Qty and Rate are required");
      return;
    }

    setItems((prev) => [...prev, itemDraft]);

    // reset draft
    setItemDraft({
      item_id: "",
      batch_no: "",
      expiry_date: "",
      pack_qty: "",
      qty: "",
      purchase_rate: "",
      mrp: "",
      gst_percent: "",
      discount_percent: "",
    });
  };

  // 🟢 Add or Update
  const handleSubmit = () => {
    if (editMode) {
      // For now, keep update logic simple: pass full formData to update
      updatepurchaseinvoice.mutate(
        { id: formData.purchase_id, data: formData },
        {
          onSuccess: () => setOpen(false),
        }
      );
    } else {
      // ✅ Enforce store & supplier
      if (!formData.store_id || !formData.supplier_id) {
        alert("Store and Supplier are required");
        return;
      }

      if (!items.length) {
        alert("Add at least one item");
        return;
      }

      // 🔐 Must have logged-in user
      if (!currentUser?.user_id) {
        console.log("currentUser in header:", currentUser);
        alert("No logged in user found. Please login again.");
        return;
      }

      // ✅ Build payload expected by createPurchase controller
      const payload = {
        store_id: Number(formData.store_id),
        supplier_id: Number(formData.supplier_id),

        // 🔥 main fix: use currentUser.user_id instead of formData.user_id
        created_by: currentUser.user_id,

        invoice_no: formData.invoice_no || undefined,
        items: items.map((i) => ({
          item_id: Number(i.item_id),
          batch_no: i.batch_no,
          expiry_date: i.expiry_date, // ISO string or YYYY-MM-DD
          qty: Number(i.qty),
          purchase_rate: Number(i.purchase_rate),
          mrp: Number(i.mrp || 0),
          discount_percent: Number(i.discount_percent || 0),
          // pack_qty can also be sent if your backend supports it
        })),
      };

      console.log("FINAL PAYLOAD BEFORE API:", payload);

      addpurchaseinvoice.mutate(payload, {
        onSuccess: () => {
          setOpen(false);
          setItems([]);
        },
      });
    }
  };

  // ✏️ Edit Handler (for header row; items editing not wired yet)
  const handleEdit = (row) => {
    console.log("row", row);
    setFormData({
      purchase_id: row.purchase_id,
      invoice_no: row.invoice_no,
      invoice_date: row.invoice_date,
      supplier_id: row.supplier_id,
      store_id: row.store_id,
      user_id: row.created_by,
      total_amount: row.total_amount,
      total_discount: row.total_discount,
      total_gst: row.total_gst,
      net_amount: row.net_amount,
    });
    setItems([]); // you can later load invoice items into this
    setEditMode(true);
    setOpen(true);
  };

  // ❌ Delete Handler
  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this purchase invoice?")
    ) {
      deletepurchaseinvoice.mutate(id);
    }
  };

  const handleOpenAdd = () => {
    // 🧹 Clear previous data before opening
    setFormData({
      purchase_id: "",
      invoice_no: "",
      invoice_date: "",
      supplier_id: "",
      store_id: "",
      user_id: "",
      total_amount: "",
      total_discount: "",
      total_gst: "",
      net_amount: "",
    });
    setItemDraft({
      item_id: "",
      batch_no: "",
      expiry_date: "",
      pack_qty: "",
      qty: "",
      purchase_rate: "",
      mrp: "",
      gst_percent: "",
      discount_percent: "",
    });
    setItems([]);
    setEditMode(false);
    setOpen(true);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <h2 className="text-xl font-bold text-blue-700 tracking-wide">
          Purchase Invoice List
        </h2>
        <Button variant="contained" color="primary" onClick={handleOpenAdd}>
          Add Purchase Invoice
        </Button>
      </div>

      <BasicTable
        columns={getPurchaseInvoiceColumns(handleEdit, handleDelete)}
        data={purchaseinvoice}
        loading={isLoading || isFetching}
      />

      <PurchaseForm
        open={open}
        onClose={() => {
          setOpen(false);
          setEditMode(false);
        }}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        itemDraft={itemDraft}
        onItemChange={handleItemChange}
        items={items}
        onAddItem={handleAddItem}
        editMode={editMode}
      />
    </>
  );
}
