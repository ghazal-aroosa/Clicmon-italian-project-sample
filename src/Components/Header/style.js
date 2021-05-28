import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
    height: "80px",
    display: "flex",
    alignItems: "center",
  },
  headerItems: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  logo: {
    display: "block",
    marginLeft: "auto",
    marginRight: " auto",
    marginTop: "10px",
    cursor: "pointer",
  },
  noti: {
    margin: "10px",
    height: "25px",
  },
  avatar: {
    display: "flex"
  }
}));
