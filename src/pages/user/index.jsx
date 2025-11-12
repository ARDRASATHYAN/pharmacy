import React, { useEffect, useState } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import UserForm from "./components/UserForm";
import { getUserColumns } from "./components/Userheader";
import BasicTable from "@/components/commen/BasicTable";
import { useAddUser, useDeleteUser, useUpdateUser, useUsers } from "@/hooks/useUsers";
import UserFilter from "./components/UserFilter";

export default function UserMockApiHeader() {

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    full_name: "",
    role: "Billing",
    is_active: true,
  });

  const [filters, setFilters] = useState({
    search: "",
    role: "",
    is_active: "",
  });

  const { data, isLoading ,isFetching } = useUsers(filters);
  const addUser = useAddUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🟢 Add or Update
  const handleSubmit = () => {
    if (editMode) {
      updateUser.mutate(
        { id: formData.user_id, data: formData },
        {
          onSuccess: () => setOpen(false),
        }
      );
    } else {
      addUser.mutate(formData, {
        onSuccess: () => setOpen(false),
      });
    }
  };

  // ✏️ Edit Handler
  const handleEdit = (row) => {
    setFormData(row);
    setEditMode(true);
    setOpen(true);
  };

  // ❌ Delete Handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser.mutate(id);
    }
  };

  const columns = getUserColumns(handleEdit, handleDelete);



  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };
  // if (isLoading) return <p>Loading users...</p>;
const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 })); 
  };
 

  return (
    <>
    <h2 className="text-xl font-bold text-blue-700 tracking-wide p-0">
           User List
          </h2>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        {/* Left: Search */}
        <Box>
          <UserFilter filters={filters} onFilterChange={handleFilterChange} searchOnly />
        </Box>

        {/* Right: Filters and Add button */}
        <Box display="flex" gap={2} alignItems="center">
          <UserFilter filters={filters} onFilterChange={handleFilterChange} />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              setOpen(true);
              setEditMode(false);
              setFormData({ username: "", password: "", full_name: "", role: "Billing", is_active: true });
            }}
          >
            Add User
          </Button>
        </Box>
      </Box>


  <BasicTable columns={columns}  data={data?.data || []} loading={isLoading || isFetching}  pagination={data?.pagination}
        onPageChange={handlePageChange} />


      <UserForm
        open={open}
        onClose={() => {
          setOpen(false);
          setEditMode(false);
        }}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}

        editMode={editMode}
      />
    </>
  );
}
