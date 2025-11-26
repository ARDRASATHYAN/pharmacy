import React, { useState } from "react";
import BasicTable from "@/components/commen/BasicTable";
import { getPurchaseReportColumns } from "./components/purchaseReportHeader";
import { usePurchaseReport, useSaleReport } from "@/hooks/useReport";
import ReportFilter from "./components/reportFilter";
import { Box, Button } from "@mui/material";
import { getSalesReportColumns } from "./components/salesReportHeader";


export default function SalesReport() {
  const [filters, setFilters] = useState({
    from_date: "",
    to_date: "",
  });

  // React Query with filters
  const { data: salesreport = [], isLoading } = useSaleReport(filters);

const handleFilterChange = (e) => {
  const { name, value } = e.target;
  setFilters((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const columns = getSalesReportColumns(); // Your table column definition

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-700 tracking-wide mb-4">
      Sales Report
      </h2>
 <Box display="flex" gap={2} alignItems="center" className="justify-end" mb={2}>
           <ReportFilter filters={filters} onFilterChange={handleFilterChange} />
        </Box>
  
      {/* Filter */}
     

      {/* Table */}
      <BasicTable 
        columns={columns} 
        data={salesreport} 
        loading={isLoading} 
      />
    </div>
  );
}
