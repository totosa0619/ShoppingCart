import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RemoveCart from "@mui/icons-material/Delete";
import ShoppingBasket from "@mui/icons-material/ShoppingBasket";
import { useShoppingCart } from "../../context/ShoppingCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imag: string;
};

function StoreItem({ id, name, price, imag }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);
  return (
    <>
      <Card sx={{ minWidth: 300 }}>
        <CardContent>
          <img
            src={imag}
            alt="card image"
            style={{ objectFit: "cover" }}
            className="card-img-top"
            height="100px"
          />
          <Typography variant="h4" component="h2">
            {name}
          </Typography>
          <Typography variant="h5" component="h2">
            {`$${price}`}
          </Typography>
        </CardContent>
        <CardActions className="d-flex justify-content-center">
          {quantity === 0 ? (
            <Button
              variant="contained"
              endIcon={<ShoppingBasket />}
              onClick={() => increaseItemQuantity(id)}
            >
              ADD TO CART
            </Button>
          ) : (
            <div className="flex-column" style={{ gap: "5.rem" }}>
              <div
                className="d-flex align-items justify-content-center"
                style={{ gap: "5.rem" }}
              >
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => decreaseItemQuantity(id)}
                >
                  -
                </button>
                <div>
                  <span className="fs-3">{quantity}</span>
                  In cart
                </div>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => increaseItemQuantity(id)}
                >
                  +
                </button>
              </div>
              <Button
                variant="contained"
                endIcon={<RemoveCart />}
                onClick={() => removeFromCart(id)}
              >
                REMOVE FROM CART
              </Button>
            </div>
          )}
        </CardActions>
      </Card>
    </>
  );
}

export default StoreItem;
