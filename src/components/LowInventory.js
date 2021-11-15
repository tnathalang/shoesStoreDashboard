import { Typography, Grid, ListItem, ListItemText, List } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const LowInventory = ({ stores }) => {
  const lowInvItems = stores.filter((store) => store.inventory < 10);

  return (
    <>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        style={{ color: "#000000" }}
      >
        Low Inventory Items
      </Typography>
      <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <Grid>
          <List>
            {lowInvItems.map((item, i) => (
              <ListItem
                style={i % 2 === 0 ? { backgroundColor: "#C1E1C1" } : {}}
                secondaryAction={<ListItemText primary={item.inventory} />}
              >
                <ListItemText primary={item.model} secondary={item.store} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Box>
    </>
  );
};

export default LowInventory;
