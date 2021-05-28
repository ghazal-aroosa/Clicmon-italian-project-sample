import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  btn: {
    margin: "0rem 0.4rem .9rem 0",
   height:30,
   width:30,
   minWidth:50,
   maxWidth:50,
   borderRadius:50
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  addbtn:{
    display:"flex",
    flexWrap:"wrap"
  },
  colorinput:{
    width:100,
    display: "flex",
    justifyContent:"center",
    alignItems:"center"
    
  }
}));
