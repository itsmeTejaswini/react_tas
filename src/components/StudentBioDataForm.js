import React, { useRef, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Divider
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function StudentBioDataForm() {
  const methods = useForm({
    defaultValues: {
      name: "",
      usn: "",
      department: "",
      college: "",
      dob: "",
      phone: "",
      email: "",
      address: ""
    }
  });

  const { handleSubmit, watch } = methods;
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef();

  const formData = watch();

  // Download PDF (A4)
  const handleDownload = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Student_Bio_Data.pdf");
  };

  return (
    <FormProvider {...methods}>
      <Box p={3}>
        <Typography variant="h5" align="center" gutterBottom>
          Student Bio-Data Form
        </Typography>

        {/* FORM */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Student Name" {...methods.register("name")} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="USN" {...methods.register("usn")} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Department" {...methods.register("department")} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="College Name" {...methods.register("college")} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Date of Birth"
                InputLabelProps={{ shrink: true }}
                {...methods.register("dob")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Phone Number" {...methods.register("phone")} />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Email" {...methods.register("email")} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Address"
                {...methods.register("address")}
              />
            </Grid>
          </Grid>

          <Box mt={3} display="flex" gap={2} justifyContent="center">
            <Button variant="contained" onClick={() => setShowPreview(true)}>
              Preview
            </Button>
            <Button
              variant="outlined"
              onClick={handleSubmit(handleDownload)}
            >
              Download A4 PDF
            </Button>
          </Box>
        </Paper>

        {/* PREVIEW */}
        {showPreview && (
          <Box mt={4}>
            <Divider />
            <Paper
              ref={previewRef}
              sx={{
                p: 4,
                mt: 3,
                width: "210mm",
                minHeight: "297mm",
                margin: "auto"
              }}
            >
              <Typography variant="h6" align="center" gutterBottom>
                Student Bio-Data
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}><b>Name:</b> {formData.name}</Grid>
                <Grid item xs={6}><b>USN:</b> {formData.usn}</Grid>
                <Grid item xs={6}><b>Department:</b> {formData.department}</Grid>
                <Grid item xs={6}><b>College:</b> {formData.college}</Grid>
                <Grid item xs={6}><b>Date of Birth:</b> {formData.dob}</Grid>
                <Grid item xs={6}><b>Phone:</b> {formData.phone}</Grid>
                <Grid item xs={12}><b>Email:</b> {formData.email}</Grid>
                <Grid item xs={12}><b>Address:</b> {formData.address}</Grid>
              </Grid>
            </Paper>
          </Box>
        )}
      </Box>
    </FormProvider>
  );
}
