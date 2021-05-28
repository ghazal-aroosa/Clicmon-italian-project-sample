import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  chip: {
    margin: "0rem 0.4rem .9rem 0",
    minWidth: 60,
    maxWidth: 60,
    // padding: "0.5rem",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  addbtn: {
    display: "flex",
    flexWrap: "wrap",
  },
}));
