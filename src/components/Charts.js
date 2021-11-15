import React, { useState } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ stores }) => {
  const storesName = [
    "ALDO Centre Eaton",
    "ALDO Destiny USA Mall",
    "ALDO Pheasant Lane Mall",
    "ALDO Holyoke Mall",
    "ALDO Maine Mall",
    "ALDO Crossgates Mall",
    "ALDO Burlington Mall",
    "ALDO Solomon Pond Mall",
    "ALDO Auburn Mall",
    "ALDO Waterloo Premium Outlets",
  ];
  const [currentStore, setCurrentStore] = useState([]);

  const currentSelectedStore = stores.filter(
    (store) => store.store === currentStore
  );

  function SortArray(x, y) {
    if (x.model < y.model) {
      return -1;
    }
    if (x.model > y.model) {
      return 1;
    }
    return 0;
  }

  const currentSortedStore = currentSelectedStore.sort(SortArray);

  const handleChange = (event) => {
    setCurrentStore(event.target.value);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Store</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentStore}
          label="Store"
          onChange={handleChange}
        >
          {storesName.map((store) => (
            <MenuItem value={store}>{store}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
      ></Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={560}
          data={currentSortedStore}
          layout="vertical"
          barCategoryGap={1}
          margin={{
            right: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis
            type="category"
            width={150}
            padding={{ left: 90, bottom: 5 }}
            dataKey="model"
            interval={0}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="inventory" fill="#C1E1C1" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Charts;
