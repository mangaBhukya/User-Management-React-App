import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { updateUser } from "../services/userApi";

export const UserEdit = ({ open, onClose, user, onUserUpdate }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.first_name) errors.first_name = "First Name is required";
    if (!formData.last_name) errors.last_name = "Last Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is not valid";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSave = async (e) => {
    try {
      if (validate()) {
      await updateUser(user.id, formData);
      onUserUpdate({
        ...formData,
        id: user.id,
      });
      
      alert('User Updated successfully!');
      onClose();
    }
    } catch (error) {
      alert('Failed to update user');
    } 
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
    setErrors({})
    onClose();
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
          error={Boolean(errors.first_name)}
          helperText={errors.first_name}
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={Boolean(errors.last_name)}
          helperText={errors.last_name}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button onClick={handleCancel} variant="outlined" color="secondary">
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