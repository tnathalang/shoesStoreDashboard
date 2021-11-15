import {
  TableCell,
  TableRow,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TablePagination,
} from "@mui/material";
import React, { useState } from "react";

const StoresList = ({ stores }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const storesToDisplay = stores.slice(0, -1);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell> Store </TableCell>
                <TableCell align="right"> Shoes Name </TableCell>
                <TableCell align="right"> Remaining Inventory </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {storesToDisplay
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={
                      row.inventory <= 10
                        ? { backgroundColor: "#FF3D3D" }
                        : { backgroundColor: "#FFFFFF" }
                    }
                  >
                    <TableCell component="th" scope="row">
                      {row.store}
                    </TableCell>
                    <TableCell align="right">{row.model}</TableCell>
                    <TableCell align="right">{row.inventory}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={storesToDisplay.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default StoresList;
