import React from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import storeItems from "../../data/items.json";
import { Stack } from "react-bootstrap";
import formatCurrency from "../../utilites/FormatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();

  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imag}
        style={{ width: "75px", height: "125px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              {quantity}
            </span>
          )}
        </div>
        <div className="me-auto" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <button
        type="button"
        className="btn btn-outline-danger btn-sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </button>
    </Stack>
  );
};

export default CartItem;
