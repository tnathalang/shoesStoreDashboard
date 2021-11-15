import { Container, CssBaseline, Grid, Paper, Box } from "@mui/material";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Charts from "./Charts";
import LowInventory from "./LowInventory";
import Orders from "./Orders";

const Dashboard = () => {
  const url = "ws://localhost:8080/";

  const [previousStoreData, setPreviousStoreData] = useState([]);
  const [currentStoreData, setCurrentStoreData] = useState([]);
  const [stores, setStores] = useState([]);
  const [, setConnection] = useState(false);
  const [isreconnect, setIsreconnect] = useState(null);

  const clientRef = useRef(null);

  const getItemIndex = (arr, currentStore) => {
    return arr.findIndex(
      (x) => x.store === currentStore.store && x.model === currentStore.model
    );
  };
  const storeEdit = useCallback(() => {
    const itemIndex = getItemIndex(stores, currentStoreData);
    // if index is not found, we add to state
    if (itemIndex === -1) {
      setStores([
        {
          store: currentStoreData.store,
          model: currentStoreData.model,
          inventory: currentStoreData.inventory,
        },
        ...stores,
      ]);
      return;
    }
    //if index is found we want to only update the inventory

    if (itemIndex !== 0) {
      const newArr = [...stores];
      newArr[itemIndex]["inventory"] = currentStoreData.inventory;
      const affectedEl = newArr[itemIndex];
      const newArrWithoutAffectedEl = newArr.filter((x) => x !== affectedEl);
      const arrWithUpdateShowingFirst = [affectedEl].concat(
        newArrWithoutAffectedEl
      );
      setStores(arrWithUpdateShowingFirst);
    }
  }, [currentStoreData, stores]);

  useEffect(() => {
    if (isreconnect) {
      return;
    }
    if (!clientRef.current) {
      const client = new WebSocket(url);
      clientRef.current = client;

      window.client = client;

      client.onerror = (e) => console.error(e);

      client.onopen = () => {
        setConnection(true);
        console.log("ws opened");
        client.send("ping");
      };

      client.onclose = () => {
        if (clientRef.current) {
          console.log("ws closed by server");
        } else {
          console.log("ws closed by app component unmount");
          return;
        }

        if (isreconnect) {
          return;
        }

        setConnection(false);
        console.log("ws closed");
        setIsreconnect(true);
      };

      client.onmessage = (storesData) => {
        const newStoresData = JSON.parse(storesData.data);
        setCurrentStoreData(newStoresData);
        setPreviousStoreData((previousStoreData) => [
          ...previousStoreData,
          newStoresData,
        ]);
      };

      return () => {
        console.log("Cleanup");
        clientRef.current = null;
        client.close();
      };
    }
  }, [isreconnect]);

  useEffect(() => {
    if (previousStoreData && currentStoreData) {
      storeEdit();
    }
  }, [storeEdit, currentStoreData, previousStoreData]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 700,
                  }}
                >
                  <Charts stores={stores} key={stores.id} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 700,
                    overflow: "auto",
                  }}
                >
                  <LowInventory stores={stores} key={stores.id} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "100%",
                    overflow: "auto",
                  }}
                >
                  <Orders stores={stores} key={stores.id} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
