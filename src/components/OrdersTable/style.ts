import { styled } from "@mui/material/styles";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";

export const StyledTableContainer = styled(TableContainer)(() => ({
  backgroundColor: "transparent",
}));

export const StyledTable = styled(Table)(() => ({
  tableLayout: "auto",
  overflowX: "auto",
  minWidth: 400
}));

export const StyledTableRow = styled(TableRow)(() => ({
  "& td": {
    border: "none",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export const AvatarCell = styled(TableCell)(({theme}) => ({
  width: 50,

  [theme.breakpoints.up("md")]: {
    width: 100
  }
}));

export const StatusContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
}));