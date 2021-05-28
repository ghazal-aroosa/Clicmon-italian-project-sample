import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Header from "../Header/index";
import Typography from "@material-ui/core/Typography";
import { db } from "../../Firebase/firebase";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styles";

function Home() {
  const classes = useStyles();
  const history = useHistory();

  /*here code start : retrieve data from firebase store*/

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    setLoading(true);
    const ref = db.collection("Products");

    function getProducts() {

      ref.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        //console.log(items);
        setProducts(items);
      });
    }

    getProducts();
    setLoading(false);
  }, []);

  if (loading) {
    return <h2>Loading....</h2>;
  }

  return (
    <div>
      <Header />
      <br />
      <div className={classes.root}>
        {products.map((product, index) => (
          <div key={index}>
            {(product.name && product.price) === "" ? (
              ""
            ) : (
              <Card className={classes.card}>
                <CardMedia
                component="img"
                alt="product image"
                  image={product.images}
                  title="smart watch"
                  style={{ height: "72%" }}
                />
                <CardContent>
                  <div className={classes.watchselect}>
                    <Typography variant="h6">
                      {product.name}
                    </Typography>
                    <Typography variant="h5" component="h2" >
                      {product.price}€
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
      <div className={classes.addbutton}>
        <Button
          variant="contained"
          color="secondary"
          style={{ padding: " 1% 4%", margin:"5% 0% 5% 0%",borderRadius: "50px" }}
          onClick={() => {
            history.push(`/Product`);
          }}
        >
          ADD TO PRODUCT
        </Button>
      </div>
    </div>
  );
}
export default Home;
