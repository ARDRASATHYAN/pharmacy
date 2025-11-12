import React from "react";
import { TextField, MenuItem, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function FilterBar({ filters, onFilterChange, filterFields }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between", // properly space items
        gap: 1.5,
        flexWrap: "wrap",
      }}
    >
      {filterFields.map((field) => {
        if (field.type === "text") {
          return (
            <TextField
              key={field.name}
              name={field.name}
              value={filters[field.name]}
              onChange={onFilterChange}
              placeholder={field.placeholder}
              size="small"
              variant="outlined"
              sx={{ width: field.width }}
              InputProps={{
                startAdornment:
                  field.icon === "search" ? (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ) : null,
                sx: { height: 32, fontSize: 13, padding: "0 8px" },
              }}
            />
          );
        } else if (field.type === "select") {
          return (
            <TextField
              key={field.name}
              select
              label={field.label}
              name={field.name}
              value={filters[field.name]}
              onChange={onFilterChange}
              size="small"
              variant="outlined"
              sx={{ width: field.width }}
              InputProps={{ sx: { height: 32, fontSize: 13, padding: "0 8px" } }}
              InputLabelProps={{ sx: { fontSize: 12 } }}
            >
              {field.options.map((option) =>
                typeof option === "string" ? (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ) : (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                )
              )}
            </TextField>
          );
        }
      })}
    </Box>
  );
}
