import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { updateUser } from "../services/userApi";

export const UserEdit = ({ open, onClose, user }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    console.log("formData", formData);
    try {
      const updatedData = await updateUser(user.id, formData);
      console.log("updatedData", updatedData);
      alert('User Updated successfully!');
      onClose();
    } catch (error) {
      alert('Failed to update user');
    }
    
  };

  const handleChange = (e) => {
    console.log("e.target.value", e.target.value);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
         sx={{
          width: '90%',
          maxWidth: 500,
          p: 4,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 24,
          mx: 'auto',
          my: '20vh',
          overflowY: 'auto',
          maxHeight: '80vh',
          '@media (max-width: 600px)': {
            p: 2,
            my: '10vh',
          },
        }}
      >
        <Typography variant="h6" mb={2}>
          Edit User
        </Typography>
        <TextField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};