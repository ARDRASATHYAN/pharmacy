import React, { useState } from "react";
import BasicTable from "@/components/commen/BasicTable";
import { usePurchaseReport, usePurchaseReturnReport, useSaleReport, useSalesReturnReport } from "@/hooks/useReport";
import ReportFilter from "./components/reportFilter";
import { Box, Button } from "@mui/material";
import { getSalesReturnReportColumns } from "./components/SalesReportReturnHeader";



export default function SalesReturnReport() {
  const [filters, setFilters] = useState({
    from_date: "",
    to_date: "",
  });

  // React Query with filters
  const { data: salesreturnreport = [], isLoading } = useSalesReturnReport(filters);

const handleFilterChange = (e) => {
  const { name, value } = e.target;
  setFilters((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const columns = getSalesReturnReportColumns(); // Your table column definition

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-700 tracking-wide mb-4">
     Sales Return Report
      </h2>
 <Box display="flex" gap={2} alignItems="center" className="justify-end" mb={2}>
           <ReportFilter filters={filters} onFilterChange={handleFilterChange} />
        </Box>
  
      {/* Filter */}
     

      {/* Table */}
      <BasicTable 
        columns={columns} 
        data={salesreturnreport} 
        loading={isLoading} 
      />
    </div>
  );
}
