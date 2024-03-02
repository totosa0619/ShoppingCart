import React, { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/item/ShoppingCart";
import useLocalStorage from "../Hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export default function ShoppingCartProvider({
  children,
}: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: number) {
    return cartItems.find((i) => i.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((i) => i.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((i) => {
          if (i.id === id) {
            return { ...i, quantity: i.quantity + 1 };
          } else {
            return i;
          }
        });
      }
    });
  }

  function decreaseItemQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((i) => i.id === id)?.quantity === 1) {
        return currentItems.filter((i) => i.id !== id);
      } else {
        return currentItems.map((i) => {
          if (i.id === id) {
            return { ...i, quantity: i.quantity - 1 };
          } else {
            return i;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((curItems) => {
      return curItems.filter((i) => i.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        closeCart,
        openCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
