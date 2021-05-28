import { Menu, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import { Colors } from "../Colors";
import ErrorText from "../ErrorText";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Header from "../Header/index";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import NestedMenuItem from "material-ui-nested-menu-item";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import RightGrid from "./SubmitProduct";
import Specifications from "../Specifications";
import Switch from "@material-ui/core/Switch";
import Tags from "../Tags";
import { db } from "../../Firebase/firebase";
import { firebaseApp } from "../../Firebase/firebase";
import imgUpload from "../../Asset/image.png";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStyles } from "./style";

function Product() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const classes = useStyles();

  /////////////////////////////////////
  //States and functions
  /////////////////////////////////////

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState("");
  const [shipFree, setShipFree] = useState(false);
  const [discounted, setDiscounted] = useState(false);
  const [type, setType] = useState("");
  const [shipmentType, setShipmentType] = useState("");
  const [images, setImages] = useState("");
  const history = useHistory();
  const [imageName, setImageName] = useState("");
  const [tag, setTag] = useState([]);
  const [tagColor, setTagColor] = useState([]);
  // ends above//
  const [specValue, setSpecValue] = useState([]);

  /////Function handling For Image_preview before Upload  ////////
  const Image_Preview = async (e) => {
    const file = e.target.files[0];
    if (e.target.files.length > 0) {
      var src = URL.createObjectURL(e.target.files[0]);
      var preview = document.getElementById("image-preview");
      preview.src = src;
    }
    setImageName(file.name);
    // setImages(src);

    const storageRef = firebaseApp.storage().ref();
    const fileRef = storageRef.child(file.name).put(file);
    await fileRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log("File available at", downloadURL);
      setImages(downloadURL);
      console.log(file.name);
    });
  };

  /////function handling for convert string into Integer for "Price"////
  function isInputNumber(e) {
    var re = /^[0-9\b]+$/;

    if (e.target.value < discountPrice) {
      setDiscountPrice("");
    }

    if (e.target.value === "" || re.test(e.target.value)) {
      setPrice(Number(e.target.value));
    }
  }
  /////function Handling for convert String into Integer for "Discount price"/////
  function isInputNumber_discount(e) {
    var re = /^[0-9\b]+$/;

    if (e.target.value >= price) {
      alert("Discount price should be less then original price");
    } else {
      if (e.target.value === "" || re.test(e.target.value)) {
        setDiscountPrice(e.target.value);
      }
    }
  }
  /////////////////////////////////////
  //Sending data to firebase
  /////////////////////////////////////

  const onSubmit = (data) => {
    console.log(data);
    // debugger;
    // e.preventDefault();
    //setLoader(true);
    // for images you can use data.Pictures that contains array of values
    db.collection("Products")
      .add({
        name: data.name,
        category: age,
        description: data.description,
        price: Number(data.price),
        discountPrice: Number(data.discountPrice),
        discounted: discounted,
        shipFree: shipFree,
        type: data.type,
        shipmentType: data.shipmentType,
        images: images,
        tag: tag,
        color: tagColor,
        specValue: specValue,
      })
      .then(() => {
        alert("Product Data has been submitted");
        history.push("/");
        //setLoader(false);
      })
      .catch((error) => {
        alert(error);
        //setLoader(false);
      });
    setName("");
    setCategory("");
    setDescription("");
    setPrice();
    setDiscountPrice();
    setDiscounted(false);
    setShipFree("");
    setType("");
    setShipmentType("");
    setImages("");
  };
  //functions  for dropdown//
  const [age, setAge] = useState();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [menuPosition, setMenuPosition] = useState(null);
  const ClearCategoria = (e) => {
    debugger;
    if (e.keyCode === 8) {
      setAge("");
    }
  };
  const handleClick = (event) => {
    debugger;
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    setMenuPosition({
      top: event.clientY,
      left: event.clientX,
    });
  };

  const handleClose = () => {
    setMenuPosition(null);
  };
  const UpdateValue = (value) => {
    debugger;
    if (breadcrumbs.length > 0) {
      if (age !== null || age !== "" || age !== undefined) {
        setAge("");
      }
      let newValue = breadcrumbs.join("=>");
      newValue = newValue + "=>" + value;
      setAge(newValue);
      setBreadcrumbs([]);
      console.log(breadcrumbs);
    } else {
      if (age !== null || age !== "") {
        setAge("");
        setBreadcrumbs([]);
      }
      setAge(value);
    }
  };
  useEffect(() => {
    setBreadcrumbs([]);
  }, []);
  const addValuetoArray = (value) => {
    if (breadcrumbs.indexOf(value) < 0) {
      setBreadcrumbs([...breadcrumbs, value]);
    }
  };
  // ends above//
  return (
    <div>
      <Header />

      <h2 className={classes.heading}>ADD NEW PRODUCT</h2>
      {/* /////////////////////////////////////
//Left Grid
///////////////////////////////////// */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={1} md={false}></Grid>

          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <div className={classes.text}>
                <Grid container spacing={1} className={classes.inputFields}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" component="h6">
                      Nome prodotto
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      {...register("name", {
                        required: true,
                      })}
                      label="Nome Prodotto"
                      variant="outlined"
                      className={classes.inputText}
                    />
                    {errors?.name?.type === "required" && <ErrorText />}
                  </Grid>
                </Grid>
                <Grid container spacing={2} className={classes.inputFields}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" component="h6">
                      Tipo
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="type"
                        name="type"
                        {...register("type", {
                          required: true,
                        })}
                        // onChange={(e) => {
                        //   setType(e.target.value);
                        // }}
                      >
                        <FormControlLabel
                          value="Nuovo"
                          control={<Radio />}
                          label="Nuovo"
                        />
                        <FormControlLabel
                          value="Usato"
                          control={<Radio />}
                          label="Usato"
                        />
                        <FormControlLabel
                          value="Ricondizionato"
                          control={<Radio />}
                          label="Ricondizionato"
                        />
                      </RadioGroup>
                      {errors?.type?.type === "required" && <ErrorText />}
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className={classes.inputFields}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" component="h6">
                      Categoria
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" component="fieldset">
                      <div
                        onClick={handleClick}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                      >
                        <TextField
                          value={age}
                          onKeyDown={ClearCategoria}
                          // label="Nome Prodotto"
                          variant="outlined"
                          className={classes.inputText}
                        />
                        <Menu
                          open={!!menuPosition}
                          onClose={() => setMenuPosition(null)}
                          anchorReference="anchorPosition"
                          anchorPosition={menuPosition}
                        >
                          <MenuItem
                            component="div"
                            value="Rack"
                            onClick={() => {
                              handleClose();
                              UpdateValue("Rack");
                            }}
                          >
                            Rack
                          </MenuItem>
                          <MenuItem
                            component="div"
                            value="Bed"
                            onClick={() => {
                              handleClose();
                              UpdateValue(["Bed"]);
                            }}
                          >
                            Bed
                          </MenuItem>
                          <NestedMenuItem
                            label="Iphone"
                            parentMenuOpen={breadcrumbs.indexOf("Iphone") > -1}
                            onClick={() => {
                              addValuetoArray("Iphone");
                            }}
                          >
                            <MenuItem
                              component="div"
                              value="Iphone Xs"
                              onClick={() => {
                                handleClose();
                                UpdateValue(["Iphone Xs"]);
                              }}
                            >
                              Iphone Xs
                            </MenuItem>
                            <MenuItem
                              component="div"
                              value="Iphone 8"
                              onClick={() => {
                                handleClose();
                                UpdateValue(["Iphone 8"]);
                              }}
                            >
                              Iphone 8
                            </MenuItem>
                            <NestedMenuItem
                              label="Smart Watch"
                              parentMenuOpen={!!menuPosition}
                              onClick={() => {
                                addValuetoArray("Smart Watch");
                              }}
                            >
                              <MenuItem
                                component="div"
                                value="Apple watch Series 3"
                                onClick={() => {
                                  handleClose();
                                  UpdateValue(["Apple watch Series 3"]);
                                }}
                              >
                                Apple watch Series 3
                              </MenuItem>
                              <MenuItem
                                component="div"
                                value="Apple watch SE"
                                onClick={() => {
                                  handleClose();
                                  UpdateValue(["Apple watch SE"]);
                                }}
                              >
                                Apple watch SE
                              </MenuItem>
                            </NestedMenuItem>
                          </NestedMenuItem>
                          <MenuItem
                            component="div"
                            value="Shoes"
                            onClick={() => {
                              handleClose();
                              UpdateValue(["Shoes"]);
                            }}
                          >
                            Shoes
                          </MenuItem>
                          <NestedMenuItem
                            label="Clothing"
                            parentMenuOpen={
                              breadcrumbs.indexOf("Clothing") > -1
                            }
                            onClick={() => {
                              addValuetoArray("Clothing");
                            }}
                          >
                            <MenuItem
                              component="div"
                              value="Men"
                              component="div"
                              onClick={() => {
                                handleClose();
                                UpdateValue(`Men`);
                              }}
                            >
                              Men
                            </MenuItem>
                            <MenuItem
                              component="div"
                              value="Women"
                              onClick={() => {
                                handleClose();
                                UpdateValue(["Women"]);
                              }}
                            >
                              Women
                            </MenuItem>
                          </NestedMenuItem>
                        </Menu>
                      </div>

                      {errors?.category?.type === "required" && <ErrorText />}
                    </FormControl>
                  </Grid>{" "}
                </Grid>

                <Grid container spacing={2} className={classes.inputFields}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" component="h6">
                      Descrizione
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      {...register("description", {
                        required: true,
                      })}
                      label="Descrizione"
                      variant="outlined"
                      className={classes.description}
                    />
                    {errors?.description?.type === "required" && <ErrorText />}
                  </Grid>{" "}
                </Grid>
                <Grid container spacing={2} className={classes.inputFields}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      component="h6"
                      style={{ margin: "3% 0% 0% 0%" }}
                    >
                      Prezzo
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      {...register("price", {
                        required: true,
                      })}
                      type="number"
                      InputProps={{ inputProps: { min: 1 } }}
                      label="Prezzo"
                      variant="outlined"
                      className={classes.inputText}
                      onChange={isInputNumber}
                    />
                    {errors?.price?.type === "required" && <ErrorText />}
                  </Grid>{" "}
                </Grid>
                <Grid container spacing={2} className={classes.inputFields}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" component="h6">
                      E`previsto Uno Sconto?
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Switch
                      //checked={discounted}
                      name="discounted"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                      {...register("discounted", {})}
                      onChange={(e) => {
                        setDiscounted(e.target.checked);
                        if (e.target.checked === false) {
                          setDiscountPrice("");
                          /* reset({
                            discountPrice: "",
                          }); */
                        }
                      }}
                    />
                  </Grid>{" "}
                </Grid>
                <Grid container spacing={2} className={classes.inputFields}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      component="h6"
                      style={{ margin: "4% 0% 0% 0%" }}
                    >
                      Prezzo Scontato
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      disabled={discounted === false}
                      {...register("discountPrice", {
                        required: discounted,
                      })}
                      type="number"
                      InputProps={{ inputProps: { min: 1 } }}
                      label="Prezzo Scontato"
                      variant="outlined"
                      className={classes.inputText}
                      onChange={isInputNumber_discount}
                      value={discountPrice}
                    />
                    {errors?.discountPrice?.type === "required" && (
                      <ErrorText />
                    )}
                  </Grid>{" "}
                </Grid>
                <Grid container spacing={2} className={classes.inputFields}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      component="h6"
                      style={{ margin: "3% 0% 0% 0%" }}
                    >
                      Immagini
                    </Typography>
                  </Grid>{" "}
                  <Grid item xs={12} md={6}>
                    <table>
                      <thead>
                        <tr>
                          <td>
                            <div className={classes.fileUpload}>
                              <img
                                src={imgUpload}
                                alt="img"
                                className={classes.imagePreview}
                                id="image-preview"
                              ></img>
                            </div>
                            {errors?.Picture?.type === "required" && (
                              <ErrorText />
                            )}
                            <p className={classes.imageText}>{imageName}</p>
                          </td>
                          <td>
                            <div className={classes.root}>
                              <input
                                accept="image/*"
                                className={classes.input}
                                id="icon-button-file"
                                type="file"
                                {...register("Picture", {
                                  required: true,
                                })}
                                onChange={Image_Preview}
                              />
                              <label htmlFor="icon-button-file">
                                <IconButton
                                  color="primary"
                                  aria-label="upload picture"
                                  component="span"
                                  style={{
                                    marginLeft: "20px",
                                    marginBottom: "18px",
                                  }}
                                >
                                  <AddIcon
                                    style={{
                                      color: "lightgrey",
                                      fontSize: "40",
                                    }}
                                  />
                                </IconButton>
                              </label>
                            </div>
                          </td>
                        </tr>
                      </thead>
                    </table>
                  </Grid>{" "}
                </Grid>
                <Grid container spacing={2} className={classes.inputFields}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      component="h6"
                      style={{ margin: "2% 0% 0% 0%" }}
                    >
                      Taglia
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Tags value={tag} name={tag} setValue={setTag} />
                    {errors?.tag?.type === "required" && <ErrorText />}
                  </Grid>{" "}
                </Grid>
                <Grid container spacing={2} className={classes.inputFields}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      component="h6"
                      style={{ margin: "5% 0% 0% 0%" }}
                    >
                      Colori
                    </Typography>
                  </Grid>{" "}
                  <Grid item xs={12} md={6}>
                    <Colors
                      value={tagColor}
                      name={tagColor}
                      setValue={setTagColor}
                    />
                  </Grid>{" "}
                </Grid>
                <Grid container spacing={2} className={classes.inputFields}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      component="h6"
                      style={{ margin: "5% 0% 0% 0%" }}
                    >
                      Altre specifiche
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className={classes.specifiche}>
                      <Specifications
                        value={specValue}
                        setValue={setSpecValue}
                      />
                    </div>
                  </Grid>{" "}
                </Grid>
                <Grid container spacing={2} className={classes.inputFields}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      component="h6"
                      style={{ margin: "2% 0% 0% 0%" }}
                    >
                      Spedizione gratuita
                    </Typography>
                  </Grid>{" "}
                  <Grid item xs={12} md={6}>
                    <p style={{ left: "20%" }}>
                      <Switch
                        //checked={shipFree}

                        name="shipFree"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                        {...register("shipFree", {})}
                        onChange={(e) => {
                          setShipFree(e.target.checked);
                        }}
                      />
                    </p>
                  </Grid>{" "}
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      component="h6"
                      style={{ margin: "5% 0% 0% 0%" }}
                    >
                      Tipo di spedizione
                    </Typography>
                  </Grid>{" "}
                  <Grid item xs={12} md={6}>
                    <div style={{ margin: "5% 0% 0% 0%" }}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="shipmentType"
                          name="shipmentType"
                          // value={shipmentType}

                          {...register("shipmentType", {
                            required: true,
                          })}
                          // onChange={(e) => {
                          //   setShipmentType(e.target.value);
                          // }}
                        >
                          <FormControlLabel
                            value="Colliere Veloce (1-2 giorni)"
                            control={<Radio />}
                            label="Colliere Veloce (1-2 giorni)"
                          />
                          <FormControlLabel
                            value="Colliere Generico(3-4 giorni)"
                            control={<Radio />}
                            label="Colliere Generico(3-4 giorni)"
                          />
                          <FormControlLabel
                            value="Colliere Lento(5-6 giorni)"
                            control={<Radio />}
                            label="Colliere Lento(5-6 giorni)"
                          />
                          {errors?.shipmentType?.type === "required" && (
                            <ErrorText />
                          )}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>{" "}
                </Grid>
              </div>
            </Paper>
          </Grid>

          {/* =============================
//right grid
============================ */}

          <Grid item xs={12} md={4}>
            <RightGrid saveData={handleSubmit} />
          </Grid>
        </Grid>
      </form>

      {/* //Model for ImageRounded */}
    </div>
  );
}
export default Product;
