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
    header: "Expiry",
    id: "expiry",
    accessorFn: (row) => row.expiry_date || "",
  },
  {
    header: "Pack Qty",
    accessorKey: "pack_qty",
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
    header: "Disc %",
    accessorKey: "discount_percent",
  },
 {
  header: "Taxable Amount",
  accessorKey: "taxable_amount",
},
{
  header: "GST %",
  accessorKey: "gst_percent",
},
{
  header: "GST Amount",
  accessorKey: "gst_amount",
},
{
  header: "Total (With GST)",
  accessorKey: "line_total_with_gst",
},


];
