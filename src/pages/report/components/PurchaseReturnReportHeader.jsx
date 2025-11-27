// src/pages/reports/components/purchaseReturnReportHeader.js

export const getPurchaseReturnReportColumns = () => [
  {
    header: "Return Date",
    accessorFn: (row) => row.purchaseReturn?.return_date || "",
    id: "return_date",
  },
  {
    header: "Invoice No",
    accessorFn: (row) => row.purchaseReturn?.purchase?.invoice_no || "",
    id: "invoice_no",
  },
  {
    header: "Invoice Date",
    accessorFn: (row) => row.purchaseReturn?.purchase?.invoice_date || "",
    id: "invoice_date",
  },
  {
    header: "Store",
    accessorFn: (row) => row.purchaseReturn?.store?.store_name || "",
    id: "store_name",
  },
  {
    header: "Returned By",
    accessorFn: (row) => row.purchaseReturn?.creator?.username || "",
    id: "returned_by",
  },
  {
    header: "Item",
    accessorFn: (row) => row.item?.name || "",
    id: "item_name",
  },
  {
    header: "Pack Size",
    accessorFn: (row) => row.item?.pack_size || "",
    id: "pack_size",
  },
  {
    header: "Batch No",
    accessorKey: "batch_no",
  },
  {
    header: "Qty",
    accessorKey: "qty",
  },
  {
    header: "Rate",
    accessorKey: "rate",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Reason",
    accessorFn: (row) => row.purchaseReturn?.reason || "",
    id: "reason",
  },
];
