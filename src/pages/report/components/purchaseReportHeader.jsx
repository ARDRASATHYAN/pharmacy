// src/pages/reports/components/purchaseReportHeader.js
export const getPurchaseReportColumns = () => [
  {
    header: "Invoice No",
    accessorKey: "invoice.invoice_no",
  },
  {
    header: "Invoice Date",
    accessorKey: "invoice.invoice_date",
  },
  {
    header: "Store",
    accessorFn: (row) => row.invoice?.store?.store_name || "",
    id: "store_name",
  },
  {
    header: "Supplier",
    accessorFn: (row) => row.invoice?.supplier?.supplier_name || "",
    id: "supplier_name",
  },
  {
    header: "Item",
    accessorFn: (row) => row.item?.name || "",
    id: "item_name",
  },
  {
    header: "Batch",
    accessorKey: "batch_no",
  },
  {
    header: "Qty",
    accessorKey: "qty",
  },
  {
    header: "Rate",
    accessorKey: "purchase_rate",
  },
  {
    header: "Amount",
    accessorKey: "total_amount",
  },

];
