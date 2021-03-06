import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const Cell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.common.black,
    fontSize: 14,
    fontWeight: "bold",
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

export default Cell;
