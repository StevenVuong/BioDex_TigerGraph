import React from "react";
import { Box } from "@mui/material";
import NavigationDrawer from "./modules/drawer";
import Navigation from "./navigation";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <NavigationDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Navigation />
      </Box>
    </Box>
  );
}

export default App;
