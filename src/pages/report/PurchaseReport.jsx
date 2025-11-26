import React, { useState } from "react";
import BasicTable from "@/components/commen/BasicTable";
import { getPurchaseReportColumns } from "./components/purchaseReportHeader";
import { usePurchaseReport } from "@/hooks/useReport";
import ReportFilter from "./components/reportFilter";
import { Box, Button } from "@mui/material";


export default function PurchaseReport() {
  const [filters, setFilters] = useState({
    from_date: "",
    to_date: "",
  });

  // React Query with filters
  const { data: purchasereport = [], isLoading } = usePurchaseReport(filters);

const handleFilterChange = (e) => {
  const { name, value } = e.target;
  setFilters((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const columns = getPurchaseReportColumns(); // Your table column definition

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-700 tracking-wide mb-4">
        Purchase Report
      </h2>
 <Box display="flex" gap={2} alignItems="center" className="justify-end" mb={2}>
           <ReportFilter filters={filters} onFilterChange={handleFilterChange} />
        </Box>
  
      {/* Filter */}
     

      {/* Table */}
      <BasicTable 
        columns={columns} 
        data={purchasereport} 
        loading={isLoading} 
      />
    </div>
  );
}
