import "./App.css";
import { Box } from "@mui/material";
import StudentBioDataForm from "./components/student";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <StudentBioDataForm />
      </Box>
    </Box>
  );
}

export default App;
