import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  //Home styles
  root: {
    display: "flex",
    flexFlow: "wrap",
    justifyContent: "center",
    padding: "2px",
  },
  title: {
    fontSize: 14,
  },

  card: {
    width: 250,
    height: 250,
    margin: 10,
  },
  media: {
    height: 150,
  },
  watchselect: {
    display: "flex",
    justifyContent: "space-between",
  }

  ,
  addbutton :{
    textAlign: "center",
    marginTop: '1%',
  }




}));
