import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  // chips util
  chip: {
    margin: ".9rem 0.4rem .9rem 0",
    minWidth: 60,
    maxWidth: 60,
    // padding: "0.5rem",
    flex: "1 1 160px",
  },
  addbtn: {
    display: "flex",
    flexWrap: "wrap",
  },
}));
