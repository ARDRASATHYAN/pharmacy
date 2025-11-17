import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import BasicTable from "@/components/commen/BasicTable";
import { usestock } from "@/hooks/useStock";
import { getStockColumns } from "./components/StockHeader";

export default function StockMockApiHeader() {
  const { data: stock = [], isLoading,isFetching } = usestock();
//   const addSupplier = useAddSupplier();
//   const updateSupplier = useUpdateSupplier();
//   const deleteSupplier = useDeleteSupplier();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    supplier_name:"", address:"", state:"", gst_no:"",phone:"" ,email:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🟢 Add or Update
  const handleSubmit = () => {
    if (editMode) {
      updateSupplier.mutate(
        { id: formData.supplier_id, data: formData },
        {

          onSuccess: () => setOpen(false),
        }
      );
    } else {
      addSupplier.mutate(formData, {
        onSuccess: () => setOpen(false),
      });
    }
  };



  // ✏️ Edit Handler

  const handleEdit = (row) => {

    console.log("row", row);

    setFormData(row);
    setEditMode(true);
    setOpen(true);
  };

  // ❌ Delete Handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteSupplier.mutate(id);
    }
  };


 


  // ✅ pass handlers to columns (so edit/delete buttons work)
  const columns = getStockColumns(handleEdit, handleDelete);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <h2 className="text-xl font-bold text-blue-700 tracking-wide">
          stock Item List
        </h2>
        <Button variant="contained" color="primary" onClick={() => {
    // 🧹 Clear previous data before opening
    setFormData({
      supplier_name:"", address:"", state:"", gst_no:"",phone:"" ,email:""
    });
    setEditMode(false);
    setOpen(true);
  }}>
          Add supplier
        </Button>
      </div>


      <BasicTable columns={columns} data={stock} loading={isLoading || isFetching}/>


    </>
  );
}
