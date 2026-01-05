
import './App.css';
import Sidebar from "./components/Sidebar";
import FitnessCertificateForm from "./components/FitnessCertificateForm";
import StudentBioDataForm from "./components/StudentBioDataForm";
import { Box, Toolbar } from "@mui/material";
function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <FitnessCertificateForm />
         <StudentBioDataForm />
      </Box>
    </Box>
  );
}

export default App;
