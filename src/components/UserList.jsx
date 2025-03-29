import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getUsers, deleteUser } from "../services/userApi";
import { Edit, Delete } from "@mui/icons-material";
import { UserEdit } from "./UserEdit";
import { useNavigate } from 'react-router-dom'; 

import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate(); 

  const loadUsers = async (page, pageSize) => {
    try {
      const usersData = await getUsers(page + 1, pageSize);
      console.log(usersData);
      setUsers(usersData.data);
      setFilteredUsers(usersData.data);
      setTotalPages(usersData.total_pages);
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };
  useEffect(() => {
    loadUsers(page, pageSize);
  }, [page, pageSize]);

  const handleClose = () => setOpen(false);
  const handleUserEdit = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleUserDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  
    if (!confirmDelete) return;
    try {
      const data = await deleteUser(userId);
      console.log("deleteData", data);
      alert("User deleted successfully!");
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(value) ||
        user.last_name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
    );

    setFilteredUsers(filtered);
    console.log(filtered, "filtered");
  };

  const handleFilterChange = (event) => setFilterField(event.target.value);
  const handleFilterValueChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);

    if (!value.trim()) {
      setFilteredUsers(users);
    }
  };

  const applyFilter = () => {
    console.log("filterValue", filterValue);
    if (!filterField || !filterValue) return setFilteredUsers(users);
    const filtered = users.filter((user) =>
      user[filterField]?.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={params.value}
              alt=""
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
          </div>
        );
      },
    },
    {
      field: "first_name",
      headerName: "First Name",
      flex: 1,
      sortingOrder: ["desc", "asc"],
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 1,
      sortingOrder: ["desc", "asc"],
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      sortingOrder: ["desc", "asc"],
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => (
        <div className="actions-cell">
          <Edit
            onClick={() => handleUserEdit(params.row)}
            className="icon edit-icon"
          />
          <Delete
            onClick={() => handleUserDelete(params.row.id)}
            className="icon delete-icon"
          />
        </div>
      ),
      flex: 0.5,
    },
  ];

  const goBack = () => {
      navigate('/');
  };
  return (
    <div className="container">
      <Button variant="outlined" color="secondary" onClick={goBack} sx={{ mb: 2 }}>
        Back
      </Button>
      <Typography variant="h4" sx={{ mb: 2 }}>
        User Management
      </Typography>
      <TextField
        className="search-input"
        label="Search Users"
        variant="outlined"
        fullWidth
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      <div className="filter-section">
        <Select value={filterField} onChange={handleFilterChange} displayEmpty>
          <MenuItem value="" disabled>
            Select Filter Field
          </MenuItem>
          <MenuItem value="first_name">First Name</MenuItem>
          <MenuItem value="last_name">Last Name</MenuItem>
          <MenuItem value="email">Email</MenuItem>
        </Select>

        <TextField
          label="Filter Value"
          variant="outlined"
          value={filterValue}
          onChange={handleFilterValueChange}
          disabled={!filterField}
        />

        <Button onClick={applyFilter} disabled={!filterField}>
          Apply Filter
        </Button>
      </div>
      <div className="table-container">
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          rowCount={totalPages * pageSize}
          pageSizeOptions={[6]}
          paginationMode="server"
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          paginationModel={{ page, pageSize }}
          checkboxSelection={false}
          disableColumnMenu
          disableRowSelectionOnClick
        />
      </div>
      {selectedUser && (
        <UserEdit open={open} onClose={handleClose} user={selectedUser} />
      )}
    </div>
  );
};

export default UserList;
