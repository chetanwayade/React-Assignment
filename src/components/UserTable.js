import React, { Fragment } from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../css/Table.css";
import AddressDetails from "./AddressDetails";

const StyledTableCell = withStyles(theme =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  })
)(TableCell);

const UserTable = ({ users, validateZipcode }) => {
  const rows = users;
  const [state, setState] = React.useState({
    right: false,
    selecteRow: {
      address: {
        street: null,
        city: null,
        zipcode: ""
      }
    }
  });

  const handleClick = (open, row) => {
    if (open) {
      setState({
        selecteRow: row,
        right: true
      });
    } else {
      setState({
        right: false
      });
    }
  };

  return (
    <Fragment>
      <h2 className="userTitle">User Details</h2>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell component="th" scope="row">
                Id
              </StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Username</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow
                tabIndex={row.id}
                key={row.id}
                className={
                  validateZipcode(row.address.zipcode) ? "" : "highlight"
                }
              >
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.username}</StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell
                  align="right"
                  onClick={() => handleClick(true, row)}
                  className="handCursor"
                >
                  {row.address.street + ", " + row.address.city}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {state.right ? (
        <AddressDetails
          address={state.selecteRow}
          handleClick={handleClick}
          validateZipcode={validateZipcode}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default UserTable;
