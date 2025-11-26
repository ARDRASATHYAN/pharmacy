// src/pages/report/components/salesReportHeader.js

export function getSalesReportColumns() {
  return [
    {
      id: "bill_no",
      Header: "Bill No",
      accessorFn: (row) => row.invoice?.bill_no || "-",
    },
    {
      id: "bill_date",
      Header: "Bill Date",
      accessorFn: (row) => row.invoice?.bill_date || "-",
    },
    {
      id: "store_name",
      Header: "Store",
      accessorFn: (row) => row.invoice?.store?.store_name || "-",
    },
    {
      id: "customer_name",
      Header: "Customer",
      accessorFn: (row) => row.invoice?.customer?.customer_name || "-",
    },
    {
      id: "doctor_name",
      Header: "Doctor",
      accessorFn: (row) => row.invoice?.doctor_name || "-",
    },
    {
      id: "item_name",
      Header: "Item",
      accessorFn: (row) => row.item?.name || "-",
    },
    {
      Header: "Batch",
      accessorKey: "batch_no", // simple string accessor → no id needed
    },
    {
      Header: "Qty",
      accessorKey: "qty",
    },
    {
      Header: "Rate",
      accessorKey: "rate",
    },
    {
      Header: "GST %",
      accessorKey: "gst_percent",
    },
    {
      Header: "Disc %",
      accessorKey: "discount_percent",
    },
    {
      Header: "Line Total",
      accessorKey: "total_amount",
    },
    {
      id: "invoice_net_amount",
      Header: "Invoice Net",
      accessorFn: (row) => row.invoice?.net_amount || "-",
    },
  ];
}
