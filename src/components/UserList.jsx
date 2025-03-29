import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getUsers } from "../services/userApi";
import { Edit } from "@mui/icons-material";
import { UserEdit } from "./UserEdit";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUsers = async (page, pageSize) => {
    try {
      const usersData = await getUsers(page + 1, pageSize);
      console.log(usersData);
      setUsers(usersData.data);
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

  const columns = [
    {
      field: "avatar",
      headerName: "User Image",
      headerClassName: "bold-header",
      width: 100,
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
      headerClassName: "bold-header",
      width: 90,
      sortingOrder: ["desc", "asc"],
    },
    {
      field: "last_name",
      headerName: "Last Name",
      headerClassName: "bold-header",
      width: 90,
      sortingOrder: ["desc", "asc"],
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <Edit
              onClick={(e) => {
                handleUserEdit(params.row);
              }}
            />
          </div>
        );
      },
      width: 90,
    },
  ];

  return (
    <div>
      <DataGrid
        rows={users}
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
      {selectedUser && (
        <UserEdit open={open} onClose={handleClose} user={selectedUser} />
      )}
    </div>
  );
};

export default UserList;
