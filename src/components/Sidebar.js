import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1e3a8a",
          color: "white"
        }
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          HMIS
        </Typography>
      </Toolbar>

      <List>
        {["Fitness Certificate", "Dashboard", "Reports", "Logout"].map(
          (text) => (
            <ListItem
              button
              key={text}
              sx={{
                "&:hover": { backgroundColor: "#2563eb" },
                backgroundColor:
                  text === "Fitness Certificate" ? "#2563eb" : "inherit"
              }}
            >
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </Drawer>
  );
}

export default Sidebar;
