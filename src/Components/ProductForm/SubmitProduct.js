import { useStyles } from "./style";
import { Button, Typography } from "@material-ui/core";
import React from "react";

const SubmitProduct = ({ saveData }) => {
  const classes = useStyles();

  return (
    <div style={{margin: "2%"}}>
      <Typography variant="h6" component="h6">
        <div className={classes.rightText}>
          <b>Mettilo in vendita gratuitamente </b>
          <br />
          Se vendi l'oggetto, ti verrenno addebitati
          <b style={{ color: "red" }}> 0.02&euro; </b>basati sul costo totale
          dell'oggetto per l'acquirente. <br />
          <br />
          Selezionando <b>Mettilo in vendita alle tariffe mostrate, </b>
          accetti di pagare le tariffe indicate sopra. Accetti inoltre le
          condizione e ti assumi la piena responsibilita per il contenuto
          dell'inserzione e per il prodotto offerto.
        </div>
      </Typography>

      <div className={classes.submitButtons}>
        <Button
          variant="contained"
          color="secondary"
          onClick={saveData}
          type="submit"
        >
          METTI IN VENDITA
        </Button>

        <Button
          variant="outlined"
          color="secondary"
        >
          METTI IN VENDITA
        </Button>
        <Button
          variant="outlined"
          color="secondary"
        >
          METTI IN VENDITA
        </Button>
      </div>
    </div>
  );
};

export default SubmitProduct;
