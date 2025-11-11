import { IconButton } from "@mui/material";
import { Delete, Edit } from "lucide-react";



export const getStoreStockColumns = (onEdit, onDelete) => [
    {
        header: "Id",
        accessorKey: "stock_id"
    },
      {
        header: "store_id",
        accessorKey: "store_id"
    },
      {
        header: "item_id",
        accessorKey: "item_id"
    },

    {
        header: "batch_no",
        accessorKey: "batch_no",
    },
    {
        header: "expiry_date",
        accessorKey: "expiry_date"
    },
    {
        header: "mrp",
        accessorKey: "mrp"
    },
      {
        header: "purchase_rate",
        accessorKey: "purchase_rate"
    },

    {
        header: "sale_rate",
        accessorKey: "sale_rate",
    },
    {
        header: "gst_percent",
        accessorKey: "gst_percent"
    },
    // {
    //     header: "schedule_id",
    //     accessorKey: "schedule_id"
    // },
    // {
    //     header: "manufacturer",
    //     accessorKey: "manufacturer"
    // },
    // {
    //     header: "item_type",
    //     accessorKey: "item_type"
    // },
  // {
  //       header: "created_at",
  //       accessorKey: "created_at"
  //   },
  

   {
  header: "Actions",
  id: "actions",
  cell: ({ row }) => (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      <IconButton
        color="primary"
        size="small"
        onClick={() => onEdit(row.original)}
        sx={{ padding: "4px" }} // reduce default 8px
      >
        <Edit size={16} />
      </IconButton>
      <IconButton
        color="error"
        size="small"
        onClick={() => onDelete(row.original.stock_id)}
        sx={{ padding: "4px" }}
      >
        <Delete size={16} />
      </IconButton>
    </div>
  ),
}



];