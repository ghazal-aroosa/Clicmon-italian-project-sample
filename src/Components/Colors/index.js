import React, { useEffect, useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Backdrop from "@material-ui/core/Backdrop";
import { Button } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
// 1.0.5
import { Modal } from "@material-ui/core";
import { db } from "../../Firebase/firebase";
import { useStyles } from "./style";

export const Colors = ({ value, setValue, setError }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState("");
  const [colorValue, setColorValue] = useState([""]);

  useEffect(() => {
    const ref = db.collection("Color");
    function getColors() {
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        console.log(items);
        const result = items.filter((v, i) => {
          return items.map((val) => val.color).indexOf(v.color) === i;
        });

        setColorValue(result);
      });
    }
    getColors();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (clickedValue) => {
    if (setError) {
      setError("");
    }
    if (value.find((e) => e === clickedValue)) {
      const index = value.findIndex((e) => e === clickedValue);
      let arr = [...value];
      arr.splice(index, 1);
      setValue(arr);
    } else {
      setValue([...value, clickedValue]);
    }
  };
  const colorExist = () => {
    return colorValue.map((it) => it.color).indexOf(color) > -1;
  };
  const onSubmit = () => {
    if (colorExist()) {
      alert("Color already exist!");
    } else if (color === "") {
      alert("Please select color!");
    } else {
      db.collection("Color")
        .add({
          color: color,
        })
        .then(() => {
          handleClose();
          alert("Color Value added");
          //setLoader(false);
        })
        .catch((error) => {
          alert(error);
          //setLoader(false);
        });
    }
  };
  return (
    <div className={classes.addbtn}>
      {colorValue
        ? colorValue.map((option, i) => (
            <Button
              style={{
                backgroundColor: value.find((e) => e === option.color)
                  ? "#d3d3d3"
                  : "white",
                color: value.find((e) => e === option.color)
                  ? "white"
                  : "#d3d3d3",
                border: value.find((e) => e === option.color)
                  ? "none"
                  : "solid #d3d3d3 1px",
              }}
              className={classes.btn}
              key={i}
             
              onClick={() => handleClick(option.color)}
            >
              <div
                style={{
                  borderRadius: "50%",
                  height: "20px",
                  width: "20px",
                  backgroundColor: option.color,
                  border: "solid #d3d3d3 1px",
                  position: "absolute",
                  zIndex: "1",
                }}
              ></div>
            </Button>
          ))
        : null}

      <div>
        <Button onClick={handleOpen}>
          <AddIcon style={{ color: "lightgrey" }} />
        </Button>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h4 id="transition-modal-title">Select color</h4>
              <br />
              <input
                className={classes.colorinput}
                type="color"
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
              <div>
                <Button
                  style={{ margin: "10px 10px 0 0" }}
                  color="secondary"
                  variant="contained"
                  onClick={onSubmit}
                >
                  {" "}
                  Add Color
                </Button>
                <Button
                  style={{ margin: "10px 0px 0 0" }}
                  color="secondary"
                  variant="contained"
                  onClick={handleClose}
                >
                  {" "}
                  Cancel
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};
