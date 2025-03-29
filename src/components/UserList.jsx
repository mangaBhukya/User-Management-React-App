import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getUsers } from "../services/userApi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const loadUsers = async (page, pageSize) => {
    try {
      const usersData = await getUsers(page+1, pageSize);
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

  const columns = [
    {
      field: "avatar",
      headerName: "User Image",
      headerClassName: "bold-header",
      width: 100,
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
    },
    {
      field: "last_name",
      headerName: "Last Name",
      headerClassName: "bold-header",
      width: 90,
    },
  ];


  return (
    <div>
      <DataGrid
        rows={users}
        columns={columns}
        checkboxSelection
        rowCount={totalPages * pageSize}
        pageSizeOptions={[6]}
        paginationMode="server"
        onPaginationModelChange={(model) => {
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
        paginationModel={{ page, pageSize }}
      />
    </div>
  );
};

export default UserList;
