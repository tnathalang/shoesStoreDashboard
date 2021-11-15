import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";

const NavigationBar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{ background: "#C1E1C1", color: "black" }}
        >
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Shoes Store Inventory Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavigationBar;
