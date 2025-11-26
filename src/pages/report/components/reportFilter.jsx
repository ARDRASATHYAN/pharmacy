import React from "react";
import FilterBar from "@/components/commen/FilterBar";

export default function ReportFilter({ filters, onFilterChange }) {
  const filterFields = [
    { name: "from_date", label: "From Date", type: "date", width: 170 },
    { name: "to_date", label: "To Date", type: "date", width: 170 },
    // { 
    //   name: "store_id", 
    //   label: "Store", 
    //   type: "select", 
    //   options: [{ label: "All Stores", value: "" }], 
    //   width: 200 
    // },
    // { 
    //   name: "supplier_id", 
    //   label: "Supplier", 
    //   type: "select", 
    //   options: [{ label: "All Suppliers", value: "" }], 
    //   width: 200 
    // },
    // { 
    //   name: "item_id", 
    //   label: "Item", 
    //   type: "select", 
    //   options: [{ label: "All Items", value: "" }], 
    //   width: 200 
    // },
  ];

  return (
    <FilterBar 
      filters={filters} 
      onFilterChange={onFilterChange} 
      filterFields={filterFields} 
    />
  );
}
