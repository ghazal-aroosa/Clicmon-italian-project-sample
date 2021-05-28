import { Chip, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { db } from "../../Firebase/firebase";
import { useStyles } from "./style";

// 1.0.5

const Tags = ({ value, setValue, setError }) => {
  const classes = useStyles();
  const [sizeValue, setSizeValue] = useState([""]);
  //const [loading, setLoading] = useState(false);


  useEffect(() => {
    const ref = db.collection("Size");
    function getTags() {
      //setLoading(true);
      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        console.log(items);
        const result = items.filter((v, i) => {
          return items.map((val) => val.size).indexOf(v.size) === i;
        });
          setSizeValue(result);
      });
    }
  
    getTags();
  }, []);

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

  return (
    <div className={classes.addbtn}>
      {sizeValue && sizeValue.length
        ? sizeValue.map((option, i) => (
            <Chip
              icon={option.icon}
              className={classes.chip}
              key={i}
              color="primary"
              style={{
                backgroundColor: value.find((e) => e === option.size)
                  ? "#d3d3d3"
                  : "white",
                  color: value.find((e) => e === option.size)
                  ? "white"
                  : "#d3d3d3",
                  border: value.find((e) => e === option.size)
                  ? "none"
                  : "solid #d3d3d3 1px",
              }}
              label={
                <Typography variant="body2">{`${option.size}`}</Typography>
              }
              
              onClick={() => handleClick(option.size)}
            />
          ))
        : null}

      {/* <Button>
          <AddIcon />
        </Button> */}
    </div>
  );
};

export default Tags;
