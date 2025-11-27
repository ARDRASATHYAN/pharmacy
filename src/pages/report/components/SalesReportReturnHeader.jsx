export const getSalesReturnReportColumns = () => [
  {
    header: "Return Date",
    accessorFn: (row) => row.return?.return_date || "",
    id: "return_date",
  },
  {
    header: "Invoice No",
    accessorFn: (row) => row.return?.sale?.bill_no || "",
    id: "invoice_no",
  },
  {
    header: "Invoice Date",
    accessorFn: (row) => row.return?.sale?.bill_date || "",
    id: "invoice_date",
  },
  {
    header: "Store",
    accessorFn: (row) => row.return?.store?.store_name || "",
    id: "store_name",
  },
  {
    header: "Returned By",
    accessorFn: (row) => row.return?.creator?.username || "",
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
    accessorFn: (row) => row.return?.reason || "",
    id: "reason",
  },
];
