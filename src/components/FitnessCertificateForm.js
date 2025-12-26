import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Paper
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function FitnessCertificateForm() {
  const [formData, setFormData] = useState({
    id: null,
    psRefno: "",
    outwardNo: "",
    date: "",
    leaveperiodFrom: "",
    leaveperiodTo: "",
    diseaseName: "",
    isdocProduced: false,
    admittedFor: "",
    remarks: ""
  });

  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([]);

  // 🔹 Handle change
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // 🔹 Validation logic
  const validate = () => {
    let temp = {};

    if (!formData.psRefno) temp.psRefno = "PS Reference No is required";
    if (!formData.outwardNo) temp.outwardNo = "Outward No is required";
    if (!formData.date) temp.date = "Date is required";
    if (!formData.diseaseName) temp.diseaseName = "Disease Name is required";

    if (formData.leaveperiodFrom && formData.leaveperiodTo) {
      if (formData.leaveperiodFrom > formData.leaveperiodTo) {
        temp.leaveperiodTo =
          "Leave Period To must be after Leave Period From";
      }
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (formData.id === null) {
      setRows([
        ...rows,
        { ...formData, id: rows.length + 1 }
      ]);
    } else {
      setRows(
        rows.map((row) =>
          row.id === formData.id ? formData : row
        )
      );
    }

    handleClear();
  };

  // 🔹 Edit row
  const handleEdit = (row) => {
    setFormData(row);
  };

  // 🔹 Clear form
  const handleClear = () => {
    setFormData({
      id: null,
      psRefno: "",
      outwardNo: "",
      date: "",
      leaveperiodFrom: "",
      leaveperiodTo: "",
      diseaseName: "",
      isdocProduced: false,
      admittedFor: "",
      remarks: ""
    });
    setErrors({});
  };

  // 🔹 DataGrid columns
  const columns = [
    { field: "psRefno", headerName: "PS Ref No", flex: 1 },
    { field: "outwardNo", headerName: "Outward No", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "diseaseName", headerName: "Disease", flex: 1 },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() => handleEdit(params.row)}
        >
          Edit
        </Button>
      )
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Fitness Certificate Form
      </Typography>

      {/* FORM */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="PS Reference No"
                name="psRefno"
                fullWidth
                value={formData.psRefno}
                onChange={handleChange}
                error={!!errors.psRefno}
                helperText={errors.psRefno}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Outward No"
                name="outwardNo"
                fullWidth
                value={formData.outwardNo}
                onChange={handleChange}
                error={!!errors.outwardNo}
                helperText={errors.outwardNo}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                type="date"
                label="Date"
                name="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={formData.date}
                onChange={handleChange}
                error={!!errors.date}
                helperText={errors.date}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Disease Name"
                name="diseaseName"
                fullWidth
                value={formData.diseaseName}
                onChange={handleChange}
                error={!!errors.diseaseName}
                helperText={errors.diseaseName}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                type="date"
                label="Leave Period From"
                name="leaveperiodFrom"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={formData.leaveperiodFrom}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                type="date"
                label="Leave Period To"
                name="leaveperiodTo"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={formData.leaveperiodTo}
                onChange={handleChange}
                error={!!errors.leaveperiodTo}
                helperText={errors.leaveperiodTo}
              />
            </Grid>
            <Grid item xs={12}>
  <TextField
    label="Admitted For"
    name="admittedFor"
    fullWidth
    value={formData.admittedFor}
    onChange={handleChange}
  />
</Grid>


            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isdocProduced"
                    checked={formData.isdocProduced}
                    onChange={handleChange}
                  />
                }
                label="Doctor Certificate Produced"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Remarks"
                name="remarks"
                fullWidth
                multiline
                rows={2}
                value={formData.remarks}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mr: 2 }}
              >
                {formData.id ? "Update" : "Save"}
              </Button>
              <Button variant="outlined" onClick={handleClear}>
                Clear
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* TABLE */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Fitness Certificate List
      </Typography>

      <Paper sx={{ height: 300 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Paper>
    </Box>
  );
}

export default FitnessCertificateForm;
