import { Typography } from "@mui/material";
import React from "react";
import StoresList from "./StoresList";

const Orders = ({ stores }) => {
  return (
    <>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        style={{ color: "#000000" }}
      >
        Recent Orders
      </Typography>
      <StoresList key={stores.id} stores={stores} />
    </>
  );
};

export default Orders;
