import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import UserForm from "./components/UserForm";
import { getUserColumns } from "./components/Userheader";
import BasicTable from "@/components/commen/BasicTable";
import { useAddUser, useDeleteUser, useUpdateUser, useUsers } from "@/hooks/useUsers";
import UserFilter from "./components/UserFilter";
import { showErrorToast, showSuccessToast } from "@/lib/toastService";
import ConfirmDialog from "@/components/commen/ConfirmDialog";


export default function User() {

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

 const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

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

  const { data, isLoading } = useUsers(filters);
  const addUser = useAddUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  //  Add or Update
  const handleSubmit = () => {
    if (editMode) {
      updateUser.mutate(
        { id: formData.user_id, data: formData },
        {
          onSuccess: () => {
            showSuccessToast("User updated successfully");
            setOpen(false);
            setEditMode(false);
          },
          onError: (error) => {
            console.error(error);
            showErrorToast("error");
          },
        }
      );
    } else {
      addUser.mutate(formData, {
        onSuccess: () => {
          showSuccessToast("User created successfully");
          setOpen(true);
          setEditMode(false);
          setFormData({
            username: "",
            password: "",
            full_name: "",
            role: "Billing",
            is_active: true,
          });
        },
        onError: (error) => {
          console.error(error);
          showErrorToast("Failed to create user");
        },
      });
    }
  };


  // Edit Handler
  const handleEdit = (row) => {
    setFormData(row);
    setEditMode(true);
    setOpen(true);
  };



  // Delete Handler
  const handleDelete = (id) => {
    setSelectedUserId(id);
    setDeleteDialogOpen(true);
  };

  //  Confirm delete
  const confirmDelete = () => {
    if (!selectedUserId) return;

    deleteUser.mutate(selectedUserId, {
      onSuccess: () => {
        showSuccessToast("User deleted successfully");
        setDeleteDialogOpen(false);
        setSelectedUserId(null);
      },
      onError: (error) => {
        console.error(error);
        showErrorToast("Failed to delete user");
        setDeleteDialogOpen(false);
      },
    });
  };




  const columns = getUserColumns(handleEdit, handleDelete);



  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };


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
        {/*  Search */}
        <Box>
          <UserFilter filters={filters} onFilterChange={handleFilterChange} searchOnly />
        </Box>

        {/* Filters and Add button */}
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

      {/* table */}
      <BasicTable columns={columns} data={data?.data || []} loading={isLoading} pagination={data?.pagination}
        onPageChange={handlePageChange} />

      {/* Add UserForm Dialog */}
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


       {/*Delete confirmation dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setSelectedUserId(null);
        }}
      />
    </>
  );
}
