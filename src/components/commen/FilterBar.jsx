// src/components/commen/FilterBar.jsx
import React from "react";
import { TextField, MenuItem, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function FilterBar({ filters, onFilterChange, filterFields }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 1.5,
        flexWrap: "wrap",
      }}
    >
      {filterFields.map((field) => {
        // 🔹 TEXT FIELD
        if (field.type === "text") {
          return (
            <TextField
              key={field.name}
              name={field.name}
              value={filters[field.name] ?? ""}
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
        }

        // 🔹 SELECT FIELD
        if (field.type === "select") {
          return (
            <TextField
              key={field.name}
              select
              label={field.label}
              name={field.name}
              value={filters[field.name] ?? ""}
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

        // 🔹 DATE FIELD
        if (field.type === "date") {
          // Get the raw value from filters (string or null)
          const rawValue = filters[field.name] ?? null;

          return (
            <LocalizationProvider
              key={field.name} // ✅ key on the outermost element
              dateAdapter={AdapterDayjs}
            >
              <DatePicker
                label={field.label}
                // Convert stored value to dayjs or null
                value={rawValue ? dayjs(rawValue) : null}
                onChange={(newValue) => {
                  // newValue is a dayjs instance or null
                  // Convert back to string (YYYY-MM-DD) or null for your filters
                  const formattedValue =
                    newValue && newValue.isValid()
                      ? newValue.format("YYYY-MM-DD")
                      : "";

                  // Call parent handler in a consistent "event-like" shape
                  onFilterChange({
                    target: {
                      name: field.name,
                      value: formattedValue,
                    },
                  });
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: { width: field.width },
                    InputLabelProps: {
                      shrink: true,
                      sx: { fontSize: 12 },
                    },
                    InputProps: {
                      sx: { height: 32, fontSize: 13, padding: "0 8px" },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          );
        }

        return null;
      })}
    </Box>
  );
}
