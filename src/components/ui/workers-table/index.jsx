import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { worker } from "@service";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AddWorkers } from "@modal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35,137,218,1)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ data }) {
  const [edit, setEdit] = useState({});
  const [modal, setModal] = useState(false);

  const daletItem = async (id) => {
    try {
      const response = await worker.delet(id);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = (item) => {
    setModal(true);
    setEdit(item)
  };

  return (
    <>
      <AddWorkers
        modal={modal}
        toggle={() => {
          setModal(false);
        }}
        item={edit}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center"> First Name</StyledTableCell>
              <StyledTableCell align="center"> Last Name</StyledTableCell>
              <StyledTableCell align="center"> Gender</StyledTableCell>
              <StyledTableCell align="center"> Age</StyledTableCell>
              <StyledTableCell align="center">Phone</StyledTableCell>
              <StyledTableCell align="center"> Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.first_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.last_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.gender}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.age}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.phone_number}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div>
                    <EditIcon
                      onClick={() => {
                        editItem(item);
                      }}
                      className="cursor-pointer"
                    />

                    <DeleteIcon
                      className="cursor-pointer"
                      onClick={() => {
                        daletItem(item.id);
                      }}
                    />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
