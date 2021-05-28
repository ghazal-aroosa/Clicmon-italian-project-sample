import "./index.css";

import { Button, Chip, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Modal } from "@material-ui/core";
import { db } from "../../Firebase/firebase";
import { useStyles } from "./specStyle";

const Specifications = ({ value, setValue, setError }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [spec, setSpec] = React.useState("");
  const [specValue, setSpecValue] = useState([""]);
  const [loading, setloading] = useState(false);



  useEffect(() => {
    setloading(true);
 
    const ref = db.collection("Spec");

    function getSpecifications() {
      //setLoading(true);
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        /* const result = items.filter((v, i) => {
          return items.map((val) => val.spec).indexOf(v.spec) == i;
        }); */
        setSpecValue(items);
      });
    }
    getSpecifications()
    setloading(false);
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
  const specValueExist = () => {
    return specValue.map((it) => it.spec).indexOf(spec) > -1;
  };
  const onSubmit = () => {
    if (specValueExist()) {
      alert("Value already exist!");
    } else if (spec === "") {
      alert("Please select value!");
    } else {
      db.collection("Spec")
        .add({
          spec: spec,
        })
        .then(() => {
          handleClose();
          alert("Added value!");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  if (loading) return <h2 className="loader">Loading.....</h2>;
  return (
    <div className={classes.addbtn}>
      {specValue && specValue.length
        ? specValue.map((option, i) => (
            <Chip
              icon={option.icon}
              className={classes.chip}
              key={i}
              color="primary"
              style={{
                backgroundColor: value.find((e) => e === option.spec)
                  ? "#d3d3d3"
                  : "white",
                color: value.find((e) => e === option.spec)
                  ? "white"
                  : "#d3d3d3",
                border: value.find((e) => e === option.spec)
                  ? "none"
                  : "solid #d3d3d3 1px",
              }}
              label={
                <Typography variant="body2">{`${option.spec}`}</Typography>
              }
             
              onClick={() => handleClick(option.spec)}
            />
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
              <h4 id="transition-modal-title">Add Spec value</h4>
              <br />
              <TextField
                id="outlined-basic"
                label="Add value"
                variant="outlined"
                onChange={(e) => {
                  setSpec(e.target.value);
                }}
              />
              <div>
                <Button
                  style={{ margin: "10px" }}
                  color="secondary"
                  variant="contained"
                  onClick={onSubmit}
                >
                  {" "}
                  Add Spec
                </Button>
                <Button
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

export default Specifications;
