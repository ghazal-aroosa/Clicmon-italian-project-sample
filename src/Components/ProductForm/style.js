import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  //product styles
  root: {
    "& > *": {
      margin: theme.spacing(0),
      width: "30ch",
    },
  },
  heading: {
    color: "red",
    margin: "2% 0 2% 10%",
  },
  paper: {
    padding: theme.spacing(5),
    //textAlign: "center",
    margin: "1% 2% 2% 2%",
    color: theme.palette.text.secondary,
    WebkitBoxShadow: "0 0 10px lightGrey"
  },
  text: {
    /* font-weight: bold; */
    color: "black",
    fontSize: "20px",
    /*font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;*/
    textAlign: "left",
    paddingLeft: "12%",
  },
  inputFields: {
    marginBottom: "30px"
  },
  fileUpload: {
    height: "100px",
    width: "100px",
    borderRadius: "20px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid lightgrey",
    overflow: "hidden",
    transition: "all 1s",
  },
  imageText: {
    fontSize: "15px",
    marginLeft: "20px",
  },
  specifiche: {
    float: "left",
  },
  imagePreview: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  inputText: {
  "& .MuiOutlinedInput-root": {
    borderRadius: "50px",
  }
},
description: {
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
  },
  "& .MuiInputBase-input": {
    height: "5em",
  }
},
  submitButtons: {
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    "& $Button": {
      padding: "2% 10%",
      margin: "3% 0% 0% 5%",
      borderRadius: "50px",
      width: "300px",
    },
  },

  rightText: {
    textAlign: "left",
    fontSize: "15px",
    padding: "0 15% 0 5%",
    fontFamily: "Cambria, Cochin, Georgia, Times, Times New Roman, serif",
  },
  buttonDisabled: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 20,
  },
  buttonEnabled: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    marginTop: 20,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperTwo: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  
  input: {
    display: "none",
  },
}));
