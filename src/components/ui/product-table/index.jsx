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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { NavLink } from "react-router-dom";
import { AddProduct } from "@modal";
import { product } from "@service";

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
      const response = await product.delet(id);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
    }
  };

  const editItem = (item) => {
    setModal(true);
    setEdit(item);
  };

  return (
    <>
      <AddProduct
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
              <StyledTableCell align="center">Product Name</StyledTableCell>
              <StyledTableCell align="center"> Color</StyledTableCell>
              <StyledTableCell align="center"> Size</StyledTableCell>
              <StyledTableCell align="center"> Count</StyledTableCell>
              <StyledTableCell align="center">Cost</StyledTableCell>
              <StyledTableCell align="center"> Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.product_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.color.join(" ")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.size.join(" ")}
                </StyledTableCell>
                <StyledTableCell align="center">{item.count}</StyledTableCell>
                <StyledTableCell align="center">{item.cost}</StyledTableCell>

                <StyledTableCell align="center">
                  <div >
                    <NavLink to={`singl-page/${item.product_id}`}>
                      <RemoveRedEyeIcon />
                    </NavLink>
                    <DeleteIcon
                      className="cursor-pointer"
                      onClick={() => {
                        daletItem(item.product_id);
                      }}
                    />
                    <EditIcon
                      onClick={() => {
                        editItem(item);
                      }}
                      className="cursor-pointer"
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
