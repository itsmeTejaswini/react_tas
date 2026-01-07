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
  const methods = useForm();
  const { register, handleSubmit, watch } = methods;
  const [preview, setPreview] = useState(false);
  const printRef = useRef();

  const formData = watch();

  const downloadPDF = async () => {
    const canvas = await html2canvas(printRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Student_Bio_Data.pdf");
  };

  return (
    <FormProvider {...methods}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          विद्यार्थी माहिती फॉर्म / Student Bio-Data Form
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {!preview ? (
          /* ================= FORM ================= */
          <Box component="form">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="विद्यार्थ्याचे नाव / Student Name"
                  {...register("name")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="नोंदणी क्रमांक / Register Number"
                  {...register("regNo")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="विभाग / Department"
                  {...register("department")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="वय / Age"
                  {...register("age")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="पत्ता / Address"
                  {...register("address")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="मोबाईल नंबर / Mobile Number"
                  {...register("mobile")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ई-मेल / Email"
                  {...register("email")}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={handleSubmit(() => setPreview(true))}
              >
                Preview
              </Button>
            </Box>
          </Box>
        ) : (
          /* ================= PREVIEW ================= */
          <>
            <Box ref={printRef} sx={{ p: 3 }}>
              <Typography variant="h6" align="center">
                विद्यार्थी माहिती / Student Bio-Data
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography><b>नाव / Name:</b> {formData.name}</Typography>
              <Typography><b>नोंदणी क्रमांक / Reg No:</b> {formData.regNo}</Typography>
              <Typography><b>विभाग / Department:</b> {formData.department}</Typography>
              <Typography><b>वय / Age:</b> {formData.age}</Typography>
              <Typography><b>पत्ता / Address:</b> {formData.address}</Typography>
              <Typography><b>मोबाईल / Mobile:</b> {formData.mobile}</Typography>
              <Typography><b>ई-मेल / Email:</b> {formData.email}</Typography>
            </Box>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button variant="contained" onClick={downloadPDF}>
                Download PDF
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </FormProvider>
  );
}
