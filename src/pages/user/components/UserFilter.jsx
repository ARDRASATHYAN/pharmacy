import React from "react";
import FilterBar from "@/components/commen/FilterBar";


export default function UserFilter({ filters, onFilterChange, searchOnly = false }) {
  const filterFields = searchOnly
    ? [
        {
          name: "search",
          label: "Search",
          type: "text",
          placeholder: "Search by name",
          width: 200,
          icon: "search",
        },
      ]
    : [
        {
          name: "role",
          label: "Role",
          type: "select",
          options: [
            { label: "All", value: "" },
            "Admin", "Manager", "Pharmacist", "Billing", "StoreKeeper"],
          width: 130,
        },
        {
          name: "is_active",
          label: "Status",
          type: "select",
          options: [
            { label: "All", value: "" },
            { label: "Active", value: "true" },
            { label: "Inactive", value: "false" },
          ],
          width: 110,
        },
      ];

  return <FilterBar filters={filters} onFilterChange={onFilterChange} filterFields={filterFields} />;
}
