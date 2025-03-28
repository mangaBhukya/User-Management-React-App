import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getUsers } from "../services/userApi";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const usersData = await getUsers();
    console.log(usersData);
    setUsers(usersData.data);
  };
  useEffect(() => {
    loadUsers();
  });

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
    { field: "first_name", headerName: "First Name", headerClassName: "bold-header", width: 90 },
    { field: "last_name", headerName: "Last Name", headerClassName: "bold-header", width: 90 },
  ];

  return (
    <div> 
      <DataGrid
        rows={users}
        columns={columns}
        checkboxSelection
      />
    </div>
  );
};

export default UserList;
